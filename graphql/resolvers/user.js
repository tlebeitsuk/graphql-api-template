
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import 'dotenv/config.js'
import { User } from '../../models/user.js'

export const userResolver = {
  signup: async (args, req) => {
    try {
      const { name, email, password } = args

      const existingUser = await User.query().where({ email }).first()
      if (existingUser) throw new Error('email already registered')

      const user = await User.query().insert({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      }).returning('*')

      delete user.password

      const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: '15min' })

      return { user, token }
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  },

  login: async (args, req) => {
    const { email, password } = args

    try {
      const user = await User.query().where({ email }).first().returning('*')
      if (!user) throw new Error('wrong email or password')

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error('wrong email or password')

      const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: '15min' })

      return { user, token }
    } catch (error) {
      console.error(err)
      throw new Error(err)
    }
  },

  unregister: async (args, req) => {
    if (!req.user) throw new Error('unauthorized')
    const { uid } = req.user

    try {
      await User.query().deleteById(uid)

      return true
    } catch (error) {
      throw new Error(error)
    }
  },

  me: async (args, req) => {
    if (!req.user) throw new Error('unauthorized')
    const { uid } = req.user

    console.log(req.user)

    try {
      const user = await User.query().findById(uid)

      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}