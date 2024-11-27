import { makeGetUserUseCase } from '../../../UseCases/Factories/Make-Get-User-UseCase'
import { Request, Response } from 'express'

export async function GetUserController(req: Request, res: Response) {
  const { id } = req.params
  const getUserUseCase = makeGetUserUseCase()

  const user = await getUserUseCase.execute({ id: Number(id) })

  return res.status(200).json(user)
}
