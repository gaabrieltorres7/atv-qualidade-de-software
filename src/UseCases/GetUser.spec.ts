import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { GetUserUseCase } from './GetUserUseCase'
import { ResourceNotFoundError } from './Errors'

let usersRepository: InMemoryUserRepository
let sut: GetUserUseCase

describe('Get User useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get user', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })
    await usersRepository.create({
      name: 'any_name2',
      email: 'valid_email2@mail.com',
      password: 'valid_password2',
    })

    const { user } = await sut.execute({
      id: 1,
    })

    expect(user.name).toBe('any_name')
  })

  it('should not be able to get user if user does not exists', async () => {
    await expect(
      sut.execute({
        id: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
