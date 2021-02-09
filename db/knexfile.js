import 'dotenv/config.js'

export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    },
    migrations: {
      directory: './migrations',
    },
    debug: true
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
}
