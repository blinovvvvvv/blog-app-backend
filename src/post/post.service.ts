import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'
import { PostDto } from './post.dto'

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
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
}
