import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { ILike, Repository } from 'typeorm'
import { UserDto } from './user.dto'
import {
	BadRequestException,
	NotFoundException
} from '@nestjs/common/exceptions'
import { genSalt, hash } from 'bcryptjs'
import { SubscriptionEntity } from './subscription.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) options = { name: ILike(`%${searchTerm}%`) }

		return this.userRepository.find({
			where: options,
			order: {
				createdAt: 'DESC'
			},
			select: ['avatarPath', 'id', 'isVerified', 'name', 'surname']
		})
	}

	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: {
				posts: true,
				subscribers: {
					fromUser: true
				},
				subscriptions: {
					toUser: true
				},
				likes: true
			},
			select: [
				'avatarPath',
				'id',
				'isVerified',
				'name',
				'surname',
				'subscribersCount',
				'description'
			]
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOne({
			where: { phoneNumber: dto.phoneNumber }
		})

		if (!isSameUser) throw new BadRequestException('Номер уже занят')

		if (dto.password) {
			const salt = await genSalt(12)
			user.password = await hash(dto.password, salt)
		}

		user.phoneNumber = dto.phoneNumber
		user.description = dto.description
		user.name = dto.name
		user.surname = dto.surname
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async deleteUser(id: number) {
		return this.userRepository.delete({ id })
	}

	async subscribe(id: number, userId: number) {
		const data = { toUser: { id: userId }, fromUser: { id } }

		const isSubscribed = await this.subscriptionRepository.findOneBy(data)

		if (!isSubscribed) {
			const subscription = await this.subscriptionRepository.create(data)
			await this.subscriptionRepository.save(subscription)

			return true
		}

		await this.subscriptionRepository.delete(data)
		return false
	}
}
