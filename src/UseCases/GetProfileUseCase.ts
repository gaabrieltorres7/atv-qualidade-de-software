import { User } from '@prisma/client'
import { IUserRepository } from '../Repositories/UserRepository'
import { ResourceNotFoundError } from './Errors/Resource-not-found-error'

interface GetProfileUseCaseRequest {
  userId: number
}

interface GetProfileUseCaseResponse {
  user: User
}

export class GetProfileUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.userRepository.findById(Number(userId))

    if (!user) throw new ResourceNotFoundError()

    return { user }
  }
}
