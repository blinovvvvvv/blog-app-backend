import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { SubscriptionEntity } from './subscription.entity'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [TypeOrmModule.forFeature([UserEntity, SubscriptionEntity])]
})
export class UserModule {}
