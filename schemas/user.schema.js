const { gql } = require('apollo-server');

module.exports = gql(`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        age: Int!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!, age: Int!): User!
        deleteUser(id: ID!): User!
        updateUser(name: String, email: String, password: String, age: Int): User!
    }
`)