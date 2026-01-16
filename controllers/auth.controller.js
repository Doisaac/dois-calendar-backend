import { response } from 'express'

export const createUser = (req, res = response) => {
  const { name, email, password } = req.body || {}

  res.status(201).json({
    ok: true,
    msg: 'login',
    name,
    email,
    password,
  })
}

export const loginUser = (req, res = response) => {
  const { email, password } = req.body || {}

  res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  })
}

export const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renewToken',
  })
}
