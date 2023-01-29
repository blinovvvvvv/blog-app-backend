import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentEntity } from './comment.entity'

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [TypeOrmModule.forFeature([CommentEntity])]
})
export class CommentModule {}
