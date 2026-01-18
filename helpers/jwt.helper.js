import jwt from 'jsonwebtoken'

export const generateJWT = (uui, name) => {
  const secretWord = process.env.SECRET_JWT_SEED

  return new Promise((resolve, reject) => {
    const payload = { uui, name }

    jwt.sign(
      payload,
      secretWord,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          return reject('The token could not be generated')
        }

        resolve(token)
      },
    )
  })
}
