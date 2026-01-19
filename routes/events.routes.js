import { Router } from 'express'
import { body } from 'express-validator'

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../controllers/events.controller.js'
import { validateJWT } from '../middlewares/valide-jwt.middleware.js'
import { validateFields } from '../middlewares/validate-fields.middleware.js'
import { isDate } from '../helpers/isDate.js'

export const eventsRouter = Router()

// Every request goes through the middleware
eventsRouter.use(validateJWT)

eventsRouter.get('/', getEvents)

eventsRouter.post(
  '/',
  // Middlewares
  body('title', 'The field title is required').notEmpty(),
  body('start', 'The field start is required').custom(isDate),
  body('end', 'The field end is required').custom(isDate),
  validateFields,
  // Controller
  createEvent,
)

eventsRouter.put(
  '/:id',
  // Middlewares
  body('title', 'The field title is required').notEmpty(),
  body('start', 'The field start is required').custom(isDate),
  body('end', 'The field end is required').custom(isDate),
  validateFields,
  // Controller
  updateEvent,
)

eventsRouter.delete('/:id', deleteEvent)
