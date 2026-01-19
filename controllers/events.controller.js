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

export const updateEvent = async (req, res = response) => {
  const eventId = req.params.id
  const userId = req.uuid

  try {
    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No event was found with that id',
      })
    }

    // Validate if the requester is the user who created the event
    if (event.user.toString() !== userId) {
      return res.status(500).json({
        ok: false,
        msg: 'You do not have permission to edit this event',
      })
    }

    const newEvent = { ...req.body, user: userId }

    const editedEvent = await Event.findByIdAndUpdate(event.id, newEvent, {
      new: true,
    })

    return res.status(200).json({
      ok: true,
      msg: 'Event successfully edited',
      event: editedEvent,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact an administrator',
    })
  }
}

export const deleteEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  })
}
