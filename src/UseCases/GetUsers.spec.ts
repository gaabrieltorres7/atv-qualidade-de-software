import { GetUsersUseCase } from './GetUsersUseCase'
import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'

let usersRepository: InMemoryUserRepository
let sut: GetUsersUseCase

describe('Get Users useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUsersUseCase(usersRepository)
  })

  it('should be able to get users', async () => {
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

    const { users } = await sut.execute({})
    expect(users[1].name).toBe('any_name2')
  })

  it('should be able to get users with pagination', async () => {
    for (let i = 1; i <= 10; i++) {
      await usersRepository.create({
        name: 'any_name',
        email: `valid_email${i}@mail.com`,
        password: 'valid_password',
      })
    }

    const { users } = await sut.execute({
      skip: 0,
      take: 5,
    })

    expect(users).toHaveLength(5)
    expect(users[0].email).toBe('valid_email1@mail.com')
  })
})
