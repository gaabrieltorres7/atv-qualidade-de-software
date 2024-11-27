import { Request, Response } from 'express'
import { makeGetProfileUseCase } from '../../../UseCases/Factories/Make-Get-Profile-UseCase'

export async function GetProfileController(req: Request, res: Response) {
  const getProfileUseCase = makeGetProfileUseCase()
  const { user } = await getProfileUseCase.execute({ userId: req.user.id })

  const { password: _, ...userWithoutPassword } = user

  return res.status(200).json(userWithoutPassword)
}
