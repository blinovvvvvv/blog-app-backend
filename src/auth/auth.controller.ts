import { Controller, ValidationPipe } from '@nestjs/common'
import { Body, HttpCode, Post, UsePipes } from '@nestjs/common/decorators'
import { UserDto } from 'src/user/dto/user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: UserDto) {
		return this.authService.register(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getAccessToken(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto)
	}
}
