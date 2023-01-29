import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
	imports: [TypeOrmModule.forFeature([PostEntity, LikeEntity])]
})
export class PostModule {}
