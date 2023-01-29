import { Body, Controller, Param, ValidationPipe } from '@nestjs/common'
import { Delete, HttpCode, Post, UsePipes } from '@nestjs/common/decorators'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(200)
	@Auth()
	async createComment(@CurrentUser('id') id: number, @Body() dto: CommentDto) {
		return this.commentService.createComment(id, dto)
	}

	@Delete('delete/:id')
	@HttpCode(200)
	@Auth('admin')
	async deleteComment(@Param('id') id: number) {
		return this.commentService.deleteComment(id)
	}
}
