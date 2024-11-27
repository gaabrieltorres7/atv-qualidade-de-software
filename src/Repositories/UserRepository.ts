import { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
  findAll: (skip: number, take: number) => Promise<User[] | null>;
}
