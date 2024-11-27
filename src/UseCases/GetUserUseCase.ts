import { IUserRepository } from '../Repositories/UserRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './Errors'

interface GetUserUseCaseRequest {
  id: number
}

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(Number(id))

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
