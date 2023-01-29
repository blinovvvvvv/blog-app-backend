import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { PostEntity } from './post.entity'

@Entity('Like')
export class LikeEntity extends Base {
	@ManyToOne(() => UserEntity, user => user.likes)
	@JoinColumn({ name: 'like_from_user' })
	fromUser: UserEntity

	@ManyToOne(() => PostEntity, post => post.likes)
	@JoinColumn({ name: 'like_to_post' })
	toPost: PostEntity
}
