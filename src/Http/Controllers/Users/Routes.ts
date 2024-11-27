import { Router } from 'express'
import {
  CreateUserController,
  GetUserController,
  GetAllUsersController,
  LoginUserController,
  GetProfileController,
  RefreshTokenController,
} from '../../Controllers/Users'
import { Authentication } from '../../Middlewares/'

export const router = Router()

router.post('/login', (req, res) => LoginUserController(req, res))
router.post('/create', (req, res) => CreateUserController(req, res))

router.use(Authentication)

router.get('/all', (req, res) => GetAllUsersController(req, res))
router.get('/profile', (req, res) => GetProfileController(req, res))
router.get('/:id', (req, res) => GetUserController(req, res))
router.post('/refresh-token', (req, res) => RefreshTokenController(req, res))

export default router
