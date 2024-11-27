import { Request, Response } from 'express'
import { Validation } from '../../../Utils'
import jwt from 'jsonwebtoken'
import { makeLoginUserUseCase } from '../../../UseCases/Factories/Make-Login-User-UseCase'
import { InvalidCredentialsError } from '../../../UseCases/Errors/Invalid-credentials-error'
import { v4 } from 'uuid'
import { PrismaUserRepository } from '../../../Repositories/Prisma/Prisma-UserRepository'
import { PrismaClient } from '@prisma/client'

export async function LoginUserController(req: Request, res: Response) {
  const { email, password } = req.body
  const validation = new Validation(['email', 'password'])
  const errors = validation.validate({ email, password })
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  try {
    const loginUserUseCase = makeLoginUserUseCase()
    const { user } = await loginUserUseCase.execute({ email, password })

    const refreshToken = await generateRefreshToken(user.id)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1d' },
    )

    const { password: _, ...userWithoutPassword } = user

    return res.status(200).json({
      message: 'User logged in successfully',
      user: userWithoutPassword,
      token,
      refreshToken,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}

async function generateRefreshToken(id: number) {
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)
  const refreshToken = v4()
  await userRepository.updateRefreshToken(id, refreshToken)
  return refreshToken
}
