import { Base } from 'src/utils/base'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('Subscription')
export class SubscriptionEntity extends Base {
	// from user
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	// to user
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'to_user_id' })
	toUser: UserEntity
}
