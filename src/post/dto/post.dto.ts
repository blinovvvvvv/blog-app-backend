import { IsString } from 'class-validator'

export class PostDto {
	@IsString()
	text: string

	image?: string
}
