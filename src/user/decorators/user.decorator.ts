import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from '../user.entity'

export const CurrentUser = createParamDecorator(
	(data: keyof UserEntity, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<{ user: UserEntity }>()
		const user = request.user

		return data ? user[data] : user
	}
)
