import { RegisterRequestBody } from '@/models/requests/User.request'
import usersService from '@/services/users.services'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
export const loginController = async (req: Request, res: Response) => {
  const { user: { _id } }: any = req
  throw new Error('Not implemented')
  return 1
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  res.json({
    message: 'Register success',
    result
  })
}
