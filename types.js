const { gql } = require("apollo-server");

// ? NOTE: ! exclamation point signifies whether a return is required or not

const typeDefs = gql`
  input createUserData {
    name: String!
    role: String!
    surname: String!
  }

  input updateUserData {
    id: ID!
    name: String!
    role: String!
    surname: String!
  }

  type User {
    id: ID!
    name: String!
    role: String!
    seniority: String!
    skills: [String]!
    surname: String!
    traits: [String]!
  }

  type Query {
    user(id: ID!): User!
    userByName(name: String!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(input: createUserData!): User
    deleteUser(id: ID!): User
    updateUser(input: updateUserData!): User
  }
`;

module.exports = { typeDefs };
