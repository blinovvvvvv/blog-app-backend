import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'
import { PostDto } from './post.dto'
import { LikeEntity } from './like.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		@InjectRepository(LikeEntity)
		private readonly likeRepository: Repository<LikeEntity>
	) {}

	async createPost(userId: number, dto: PostDto) {
		const postData = {
			text: dto.text,
			imagePath: dto.image,
			user: { id: userId }
		}

		const post = await this.postRepository.create(postData)
		await this.postRepository.save(post)
		return post
	}

	async likePost(userId: number, postId: number) {
		const data = { fromUser: { id: userId }, toPost: { id: postId } }

		const isLiked = await this.likeRepository.findOneBy(data)

		if (!isLiked) {
			const like = await this.likeRepository.create(data)
			await this.likeRepository.save(like)

			return true
		}

		await this.likeRepository.delete(data)
		return false
	}
}
