import jwt, { SignOptions } from 'jsonwebtoken'

export const signToken = async ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}
