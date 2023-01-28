import { IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsPhoneNumber()
	phoneNumber: string

	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@IsString()
	password: string
}
