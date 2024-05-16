const { gql } = require('apollo-server');  

module.exports = gql(`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        age: Int!
        gender: String!
    }

    type Query {
        allUsers: [User!]!
        oneUser(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!, age: Int!, gender: String!): User!
        deleteUser(id: ID!): User!
        updateUser(name: String, email: String, password: String, age: Int, gender: String): User!
    }

    type Subscription {
        userUpdated: User!
    }
`)