import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm/dist'
import { getTypeORMConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: getTypeORMConfig
	}), UserModule, PostModule, CommentModule, MediaModule, AuthModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
