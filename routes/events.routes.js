import { Router } from 'express'

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../controllers/events.controller.js'
import { validateJWT } from '../middlewares/valide-jwt.middleware.js'

export const eventsRouter = Router()

// Every request goes through the middleware
eventsRouter.use(validateJWT)

eventsRouter.get('/', getEvents)

eventsRouter.post('/', createEvent)

eventsRouter.put('/:id', updateEvent)

eventsRouter.delete('/:id', deleteEvent)
