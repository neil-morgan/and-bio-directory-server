const { gql } = require("apollo-server");

const typeDefs = gql`
  input CreateUserInput {
    name: String!
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    userByName(name: String!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
