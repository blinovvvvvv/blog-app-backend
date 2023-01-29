import { IsString, IsPhoneNumber, MinLength } from 'class-validator'

export class UserDto {
	@IsString()
	name: string

	surname?: string

	@IsPhoneNumber()
	phoneNumber: string

	@MinLength(8, { message: 'Длина пароля не менее 8 символов' })
	@IsString()
	password: string

	description?: string

	avatarPath?: string
}
