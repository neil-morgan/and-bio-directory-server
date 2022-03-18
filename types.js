const { gql } = require("apollo-server");

const typeDefs = gql`
  input CreateUserData {
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
    createUser(input: CreateUserData!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
