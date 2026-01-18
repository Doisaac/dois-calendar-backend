import { response } from 'express'
import Event from '../models/Event.js'

export const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name')

    return res.status(200).json({
      ok: true,
      events,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact an administrator',
    })
  }
}

export const createEvent = async (req, res = response) => {
  const event = new Event(req.body)

  try {
    event.user = req.uuid

    const savedEvent = await event.save()

    res.status(201).json({
      ok: true,
      event: savedEvent,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact an administrator',
    })
  }
}

export const updateEvent = (req, res = response) => {
  console.log(req)
  return res.status(200).json({
    ok: true,
    msg: 'updateEvent',
  })
}

export const deleteEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  })
}
