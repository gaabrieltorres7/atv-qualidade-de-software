import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { PrismaClient } from '@prisma/client'
import { LoginUserUseCase } from '../LoginUserUseCase'

export function makeLoginUserUseCase() {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)

  const useCase = new LoginUserUseCase(userRepository)

  return useCase
}
