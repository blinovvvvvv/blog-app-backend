import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class OnlyAdmin implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserEntity }>()
		const user = request.user

		if (!user.isAdmin) throw new ForbiddenException('Куда мы лезем боже?')

		return user.isAdmin
	}
}
