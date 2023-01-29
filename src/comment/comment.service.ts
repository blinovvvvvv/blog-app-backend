import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentEntity } from './comment.entity'
import { CommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>
	) {}

	async createComment(userId: number, dto: CommentDto) {
		const comment = await this.commentRepository.create({
			post: { id: dto.postId },
			message: dto.text,
			user: { id: userId }
		})
		return this.commentRepository.save(comment)
	}

	async deleteComment(commentId: number) {
		return this.commentRepository.delete({ id: commentId })
	}
}
