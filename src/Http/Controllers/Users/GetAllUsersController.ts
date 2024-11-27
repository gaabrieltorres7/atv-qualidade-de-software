import { Request, Response } from 'express'
import { makeGetUsersUseCase } from '../../../UseCases/Factories/Make-Get-Users-UseCase'

export async function GetAllUsersController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  const getUsersUseCase = makeGetUsersUseCase()
  const users = await getUsersUseCase.execute({ skip, take })

  return res.status(200).json(users)
}
