import { response } from 'express'
import bcrypt from 'bcryptjs'

import User from '../models/User.js'
import { generateJWT } from '../helpers/jwt.helper.js'

export const createUser = async (req, res = response) => {
  const { email, password } = req.body || {}

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'A user with that email already exists',
      })
    }

    user = new User(req.body)

    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uui: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: false,
      msg: 'Please contact an administrator',
    })
  }
}

export const loginUser = async (req, res = response) => {
  const { email, password } = req.body || {}

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password',
      })
    }

    // Validate password
    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid password',
      })
    }

    const token = await generateJWT(user.id, user.name)

    res.json({
      ok: true,
      uui: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: false,
      msg: 'Please contact an administrator',
    })
  }
}

export const renewToken = async (req, res = response) => {
  const { uuid, name } = req

  // Generate a new token
  const token = await generateJWT(uuid, name)

  res.json({
    ok: true,
    uuid,
    name,
    msg: 'New token generated',
    token,
  })
}
