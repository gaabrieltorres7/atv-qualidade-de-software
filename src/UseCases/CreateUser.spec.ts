import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../Repositories/In-Memory/In-Memory-UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { InvalidPasswordError, UserAlreadyExistsError } from "./Errors";

let usersRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe("Create User useCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create an user", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "valid_email@mail.com",
      password: "valid_password1",
    });

    expect(user).toHaveProperty("id");
  });

  it("should hash user password", async () => {
    const { user } = await sut.execute({
      name: "any_name",
      email: "valid_email@mail.com",
      password: "valid_password1",
    });

    const isPasswordHashed = await compare("valid_password1", user.password);
    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to create an user with same email", async () => {
    await sut.execute({
      name: "any_name",
      email: "same_email@mail.com",
      password: "valid_password1",
    });

    await expect(() =>
      sut.execute({
        name: "any_name",
        email: "same_email@mail.com",
        password: "valid_password1",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should not be able to create an user with invalid password(less than 8 characters)", async () => {
    await expect(() =>
      sut.execute({
        name: "any_name",
        email: "valid_email@mail.com",
        password: "123",
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });

  it("should not be able to create an user with invalid password(no numbers)", async () => {
    await expect(() =>
      sut.execute({
        name: "any_name",
        email: "valid_email@mail.com",
        password: "invalid_password",
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });
});
