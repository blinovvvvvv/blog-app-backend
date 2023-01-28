import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { IMediaResponse } from './media.interface'

@Injectable()
export class MediaService {
	async saveMedia(
		media: Express.Multer.File,
		folder = 'default'
	): Promise<IMediaResponse> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		await writeFile(`${uploadFolder}/${media.originalname}`, media.buffer)

		return {
			url: `/uploads/${folder}/${media.originalname}`,
			name: media.originalname
		}
	}
}
