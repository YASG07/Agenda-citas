const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String!
        lastName: String!
        email: String!
        phone: String
        password: String!
        age: Int!
        gender: String!
    }

    type AuthPayload {
        success: Boolean!
        message: String!
        user: User
    }

    type Query {
        allUsers: [User!]!
        oneUser(id: ID!): User
        verifyUser(email: String!, password: String!): AuthPayload!
    }

    type Mutation {
        addUser(name: String!, lastName: String!, email: String!, phone: String, password: String!, age: Int!, gender: String!): User!
        deleteUser(id: ID!): User!
        updateUser(id: ID!, name: String, lastName: String, email: String, phone: String, password: String, age: Int, gender: String): User!
    }

    type Subscription {
        userCreated: User!
    }
`;
