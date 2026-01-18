import { response } from 'express'
import jwt from 'jsonwebtoken'

export const validateJWT = (req, res = response, next) => {
  // Get token from header (x-token)
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'The token is missing from the request',
    })
  }

  try {
    const { uui, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)

    req.uuid = uui
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'The token is not valid',
    })
  }

  next()
}
