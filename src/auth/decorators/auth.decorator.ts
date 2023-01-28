import { UseGuards, applyDecorators } from '@nestjs/common'
import { TypeRole } from '../auth.interface'
import { JwtGuard } from '../guards/jwt.guard'
import { OnlyAdmin } from '../guards/admin.guard'

export function Auth(role: TypeRole = 'user') {
	return applyDecorators(
		role === 'admin' ? UseGuards(JwtGuard, OnlyAdmin) : UseGuards(JwtGuard)
	)
}
