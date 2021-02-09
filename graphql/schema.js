import { buildSchema } from "graphql"

export const schema = buildSchema(`
  type Query {
    me: User!
  }

  type Mutation  {
    login(email: String!, password: String!): Auth!
    signup(name: String!, email: String!, password: String!): Auth!
    unregister: Boolean
  }

  type User {
    id: ID!
    email: String!
    name: String!
    verified: Boolean!
  }

  type Auth {
    user: User!
    token: String!
  }
`)