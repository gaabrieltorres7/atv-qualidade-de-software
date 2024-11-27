import { PrismaUserRepository } from '../../Repositories/Prisma/Prisma-UserRepository'
import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type jwtPayload = {
  id: number
}

export function Authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  try {
    const [, token] = authorization.split(' ')
    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwtPayload

    const prisma = new PrismaClient()
    const userRepository = new PrismaUserRepository(prisma)
    const user = userRepository.findById(id)

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = {
      id,
    }

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
