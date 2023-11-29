import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '@/models/schemas/User.schema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.hjjx4s0.mongodb.net/?retryWrites=true&w=majority`
class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('DatabaseServices ~ error', error)
      throw error
    }
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
