import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

export const getTypeORMConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	database: configService.get('DATABASE'),
	username: configService.get('USER'),
	password: configService.get('PASSWORD'),
	host: configService.get('HOST'),
	port: configService.get('PORT'),
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
	autoLoadEntities: true
})
