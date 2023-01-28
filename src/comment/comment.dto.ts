import { IsString, IsNumber } from 'class-validator'

export class CommentDto {
	@IsNumber()
	postId: number

	@IsString()
	text: string
}
