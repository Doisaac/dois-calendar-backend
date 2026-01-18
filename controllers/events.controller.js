import { response } from 'express'

export const getEvents = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
  })
}

export const createEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: 'createEvent',
  })
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
