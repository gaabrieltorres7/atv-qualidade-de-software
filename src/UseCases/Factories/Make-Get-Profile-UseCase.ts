import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { PrismaClient } from '@prisma/client'
import { GetProfileUseCase } from '../GetProfileUseCase'

export function makeGetProfileUseCase() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new GetProfileUseCase(userRepository)

  return useCase
}
