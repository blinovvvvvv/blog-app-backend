import { Controller, Query, UploadedFile } from '@nestjs/common'
import { HttpCode, Post, UseInterceptors } from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async uploadImage(
		@UploadedFile() media: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(media, folder)
	}
}
