import { CommentEntity } from 'src/comment/comment.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, OneToMany } from 'typeorm'
import { SubscriptionEntity } from './subscription.entity'
import { PostEntity } from 'src/post/post.entity'

@Entity('User')
export class UserEntity extends Base {
	@Column({ type: 'text' })
	name: string

	@Column({ default: '', type: 'text' })
	surname?: string

	@Column({ name: 'phone_number', unique: true })
	phoneNumber: string

	@Column({ select: false })
	password: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: false, name: 'is_admin' })
	isAdmin: boolean

	@Column({ default: 0, name: 'subscribers_count' })
	subscribersCount: number

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity[]

	@OneToMany(() => PostEntity, post => post.user)
	posts: PostEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.toUser)
	subscribers: SubscriptionEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
	subscriptions: SubscriptionEntity[]
}
