import { CommentEntity } from 'src/comment/comment.entity'
import { UserEntity } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { LikeEntity } from './like.entity'

@Entity('Post')
export class PostEntity extends Base {
	@Column({ default: '', type: 'text' })
	text: string

	@Column({ default: '', name: 'image_path' })
	imagePath?: string

	@OneToMany(() => LikeEntity, like => like.toPost, {cascade: true})
	likes?: LikeEntity[]

	@ManyToOne(() => UserEntity, user => user.posts)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => CommentEntity, comment => comment.post, {
		cascade: true
	})
	comments: CommentEntity[]
}
