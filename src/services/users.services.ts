import User from '@/models/schemas/User.schema'
import databaseServices from './database.services'
import { RegisterRequestBody } from '@/models/requests/User.request'
import { hashPassword } from '@/utils/crypto'
import { signToken } from '@/utils/jwt'
import { TokenTypes } from '@/constants/enum'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenTypes.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenTypes.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }
  private async signAccessAndRefreshToken(user_id: string) {
    return await Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async register(payload: RegisterRequestBody) {
    const user = new User({
      ...payload,
      date_of_birth: new Date(payload.date_of_birth),
      password: hashPassword(payload.password)
    })
    const result = await databaseServices.users.insertOne(user)
    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    return {
      access_token,
      refresh_token
    }
  }
  async login(email: string, password: string) {
    // const user = await databaseServices.users.findOne({ email })
    // if (user === null) {
    //   throw new Error('User not found')
    // }
    // const isPasswordValid = user.comparePassword(password)
    // if (!isPasswordValid) {
    //   throw new Error('Password invalid')
    // }
    // const user_id = user._id.toString()
    // const [access_token, refresh_token] = await Promise.all([
    //   this.signAccessToken(user_id),
    //   this.signRefreshToken(user_id)
    // ])
    // return {
    //   access_token,
    //   refresh_token
    // }
  }
  async checkEmailExists(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async getUserByEmail(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return user
  }
}
const userService = new UsersService()
export default userService
