import { Controller, ValidationPipe } from '@nestjs/common'
import {
	Body,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes
} from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { PostDto } from './dto/post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(200)
	@Auth()
	async createPost(@CurrentUser('id') id: number, @Body() dto: PostDto) {
		return this.postService.createPost(id, dto)
	}

	@Post('like/:postId')
	@HttpCode(200)
	@Auth()
	async likePost(
		@CurrentUser('id') id: number,
		@Param('postId') postId: number
	) {
		return this.postService.likePost(id, postId)
	}

	@Delete('delete/:id')
	@Auth('admin')
	async deletePost(@Param('id') id: number) {
		return this.postService.deletePost(id)
	}

	@Get()
	@Auth()
	async getPosts(@Query('limit') limit?: number) {
		return this.postService.getAll(limit)
	}
}
