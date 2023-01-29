import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist/jwt.service'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { UserDto } from 'src/user/dto/user.dto'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async register(dto: UserDto) {
		const userExists = await this.userRepository.findOneBy({
			phoneNumber: dto.phoneNumber
		})

		if (userExists) throw new NotFoundException('Номер уже занят')

		const salt = await genSalt(12)

		const newUser = await this.userRepository.create({
			name: dto.name,
			description: dto.description,
			surname: dto.surname,
			phoneNumber: dto.phoneNumber,
			password: await hash(dto.password, salt)
		})

		const user = await this.userRepository.save(newUser)

		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validate(dto)

		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async validate(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: {
				phoneNumber: dto.phoneNumber
			},
			select: ['id', 'phoneNumber', 'password']
		})

		if (!user) throw new UnauthorizedException('Пользователь не найден')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		return user
	}

	async issueTokenPair(userId: number) {
		const data = { id: +userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '7d'
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '15m'
		})

		return {
			refreshToken,
			accessToken
		}
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			phoneNumber: user.phoneNumber,
			isAdmin: user.isAdmin
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Произошла ошибочка :(')

		const user = await this.userRepository.findOneBy({ id: result.id })

		const tokens = await this.issueTokenPair(user.id)

		return {
			user,
			...tokens
		}
	}
}
