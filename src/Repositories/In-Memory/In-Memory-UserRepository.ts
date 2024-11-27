import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../UserRepository";

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: this.items.length + 1,
      name: data.name,
      email: data.email,
      password: data.password,
      refreshToken: data.refreshToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async findAll(skip: number, take: number) {
    const users = this.items.slice(skip, take);
    return users;
  }
}
