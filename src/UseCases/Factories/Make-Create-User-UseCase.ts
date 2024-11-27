import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { PrismaClient } from '@prisma/client'
import { CreateUserUseCase } from '../CreateUserUseCase'

export function makeCreateUserUseCase() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}
