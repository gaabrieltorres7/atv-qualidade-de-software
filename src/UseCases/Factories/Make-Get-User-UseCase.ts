import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { GetUserUseCase } from '../GetUserUseCase'

export function makeGetUserUseCase() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new GetUserUseCase(userRepository)

  return useCase
}
