import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { IUserRepository } from "../Repositories/UserRepository";
import { InvalidPasswordError, UserAlreadyExistsError } from "./Errors";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    if (!this.isPasswordValid(password)) {
      throw new InvalidPasswordError();
    }

    const findUserByEmail = await this.userRepository.findByEmail(email);
    if (findUserByEmail) throw new UserAlreadyExistsError();

    const hashedPassword = await hash(password, 6);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user,
    };
  }

  private isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*\d).{8,}$/; // Mínimo 8 caracteres, pelo menos 1 número
    return passwordRegex.test(password);
  }
}
