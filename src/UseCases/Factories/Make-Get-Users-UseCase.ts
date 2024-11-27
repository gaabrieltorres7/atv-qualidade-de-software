import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { GetUsersUseCase } from '../GetUsersUseCase'

export function makeGetUsersUseCase() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new GetUsersUseCase(userRepository)

  return useCase
}
