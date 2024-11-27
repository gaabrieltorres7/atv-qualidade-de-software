import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { hash } from 'bcrypt'
import { GetProfileUseCase } from './GetProfileUseCase'
import { ResourceNotFoundError } from './Errors/Resource-not-found-error'

let userRepository: InMemoryUserRepository
let sut: GetProfileUseCase

describe('Get User Profile useCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: await hash('valid_password', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toHaveProperty('refreshToken')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
