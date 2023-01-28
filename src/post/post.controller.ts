import { Controller } from '@nestjs/common'
import { PostService } from './post.service'
import { Body, HttpCode, Post } from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/user.decorator'
import { PostDto } from './post.dto'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post('create')
	@HttpCode(200)
	@Auth()
	async createPost(@CurrentUser('id') id: number, @Body() dto: PostDto) {
		return this.postService.createPost(id, dto)
	}
}
