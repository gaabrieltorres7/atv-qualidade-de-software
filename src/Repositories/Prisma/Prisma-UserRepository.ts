import { PrismaClient, Prisma, User } from '@prisma/client'

import { IUserRepository } from '../UserRepository'

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create({ name, email, password }: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return user
  }

  async findAll(skip?: number, take?: number) {
    const users = await this.prisma.user.findMany({
      skip: skip || 0,
      take: take || 10,
    })
    return users
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    return user
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { id } })
    return user
  }

  async findUserByRefreshToken(refreshToken: string) {
    const findUser = await this.prisma.user.findFirst({
      where: { refreshToken },
    })
    return findUser
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    })
    return user
  }
}
