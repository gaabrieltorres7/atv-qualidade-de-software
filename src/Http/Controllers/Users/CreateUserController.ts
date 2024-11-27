import { Request, Response } from 'express'
import { Validation } from '../../../Utils'
import { makeCreateUserUseCase } from '../../../UseCases/Factories/Make-Create-User-UseCase'
import { UserAlreadyExistsError } from '../../../UseCases/Errors'

export async function CreateUserController(req: Request, res: Response) {
  const { name, email, password } = req.body
  const validation = new Validation(['name', 'email', 'password'])
  const errors = validation.validate({ name, email, password })
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: error.message })
    }

    return res.status(500).json({ message: error.message })
  }

  return res.status(201).json({
    message: 'User has been created successfully',
  })
}
