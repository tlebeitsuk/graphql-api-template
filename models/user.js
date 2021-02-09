import { Model } from 'objection'
import db from '../db/db.js'

Model.knex(db)

export const User = class User extends Model {
  static get tableName () {
    return 'user'
  }
}
