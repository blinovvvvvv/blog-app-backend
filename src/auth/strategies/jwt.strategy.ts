import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {
		super({
			secretOrKey: configService.get('JWT_SECRET'),
			ignoreExpiration: true,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		})
	}

	async validate({ id }: Pick<UserEntity, 'id'>) {
		return this.userRepository.findBy({ id })
	}
}
