import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../Repositories/In-Memory/In-Memory-UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { InvalidCredentialsError } from "./Errors/";
import { LoginUserUseCase } from "./LoginUserUseCase";

let usersRepository: InMemoryUserRepository;
let sut: LoginUserUseCase;
let createUser: CreateUserUseCase;

describe("Login User useCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    createUser = new CreateUserUseCase(usersRepository);
    sut = new LoginUserUseCase(usersRepository);
  });

  it("should be able to login", async () => {
    expect(
      await createUser.execute({
        name: "any_name",
        email: "valid_email@mail.com",
        password: "valid_password1",
      })
    );

    const { user } = await sut.execute({
      email: "valid_email@mail.com",
      password: "valid_password1",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to login with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "invalid_email@mail.com",
        password: "valid_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to login with wrong password", async () => {
    await createUser.execute({
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "valid_password1",
    });
    await expect(() =>
      sut.execute({
        email: "valid_email@mail.com",
        password: "invalid_password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
