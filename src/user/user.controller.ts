import { Body, Controller, Get, Param, Query } from '@nestjs/common'
import { Delete, HttpCode, Patch, Put } from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: number) {
		return this.userService.byId(id)
	}

	@Put('profile')
	@Auth()
	@HttpCode(200)
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	async updateUserProfile(@Param('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	@HttpCode(200)
	async deleteUserProfile(@Param('id') id: number) {
		return this.userService.deleteUser(id)
	}

	@Patch('subscribe/:userId')
	@HttpCode(200)
	@Auth()
	async subscribe(
		@CurrentUser('id') id: number,
		@Param('userId') userId: number
	) {
		return this.userService.subscribe(id, userId)
	}
}
