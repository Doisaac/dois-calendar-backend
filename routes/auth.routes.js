import { Router } from 'express'
import { body } from 'express-validator'

import {
  createUser,
  loginUser,
  renewToken,
} from '../controllers/auth.controller.js'
import { validateFields } from '../middlewares/validate-fields.middleware.js'

export const router = Router()

router.post(
  '/new',
  // Middlewares
  body('name', 'The field name is required').notEmpty(),
  body('email', 'The field email is required').notEmpty(),
  body('email', 'The field email must be valid').isEmail(),
  body(
    'password',
    'The field password must have at least 6 characters'
  ).isLength(6),
  validateFields,
  // Controller
  createUser
)

router.post(
  '/',
  // Middlewares
  body('email', 'The field email is required').notEmpty(),
  body('email', 'The field email must be valid').isEmail(),
  body('password', 'The field password is required').notEmpty(),
  body('password', 'The field password must be at least 6 characters').isLength(
    { min: 6 }
  ),
  validateFields,
  // Controller
  loginUser
)

router.get('/renew', renewToken)
