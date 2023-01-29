import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostDto } from './dto/post.dto'
import { LikeEntity } from './like.entity'
import { PostEntity } from './post.entity'

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

	async deletePost(id: number) {
		return this.postRepository.delete({ id })
	}

	async getAll(limit?: number) {
		const posts = await this.postRepository.find({
			take: limit,
			relations: {
				user: true,
				comments: {
					user: true
				}
			}
		})

		return posts
	}
}
