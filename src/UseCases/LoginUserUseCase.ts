import { User } from '@prisma/client'
import { IUserRepository } from '../Repositories/UserRepository'
import { InvalidCredentialsError } from './Errors/Invalid-credentials-error'
import { compare } from 'bcrypt'

interface LoginUserUseCaseRequest {
  email: string
  password: string
}

interface LoginUserUseCaseResponse {
  user: User
}

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: LoginUserUseCaseRequest): Promise<LoginUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new InvalidCredentialsError()

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
