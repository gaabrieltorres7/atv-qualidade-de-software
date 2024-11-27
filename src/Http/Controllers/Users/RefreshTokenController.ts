import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { Validation } from '../../../Utils'
import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from '../../../Repositories/Prisma/Prisma-UserRepository'

export async function RefreshTokenController(req: Request, res: Response) {
  const { refreshToken } = req.body
  const validation = new Validation(['refreshToken'])
  const errors = validation.validate({ refreshToken })
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  const newRefreshToken = await generateRefreshToken(req.user.id)
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1d',
  })

  return res.status(200).json({
    message: 'Token refreshed successfully',
    token,
    refreshToken: newRefreshToken,
  })
}

async function generateRefreshToken(id: number) {
  const refreshToken = v4()
  const prisma = new PrismaClient()
  const userRepository = new PrismaUserRepository(prisma)
  await userRepository.updateRefreshToken(id, refreshToken)
  return refreshToken
}
