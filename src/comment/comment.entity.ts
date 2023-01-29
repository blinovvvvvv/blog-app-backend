import { PostEntity } from 'src/post/post.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('Comment')
export class CommentEntity extends Base {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => UserEntity, user => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => PostEntity, post => post.comments)
	@JoinColumn({ name: 'post_id' })
	post: PostEntity
}
