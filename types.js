const { gql } = require("apollo-server");

// ? NOTE: ! exclamation point signifies whether a return is required or not

const typeDefs = gql`
  input CreateUserData {
    name: String!
    jobTitle: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String!
    jobTitle: String!
  }

  type User {
    id: ID!
    name: String!
    jobTitle: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    userByName(name: String!): User!
  }

  type Mutation {
    createUser(input: CreateUserData!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
