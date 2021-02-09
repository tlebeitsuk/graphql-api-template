import express from 'express'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js'
import { userResolver } from './graphql/resolvers/user.js'

dotenv.config()

const app = express()

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)

app.use(
  process.env.GRAPHQL_PATH,
  graphqlHTTP(async req => ({
    schema,
    rootValue: userResolver,
    // context: () => auth(req),
    // context: {
    //   user: req.user
    // },
    graphiql: { headerEditorEnabled: true }
  })))

const port = process.env.PORT || 4000

app.listen(port, () =>
  console.log(`🚀 Server started at http://localhost:${process.env.PORT}${process.env.GRAPHQL_PATH}`)
)
