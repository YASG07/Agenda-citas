const { gql } = require("apollo-server");

module.exports = gql(`
    type Doctor{
        id: ID!
        name: String!
        lastName: String!
        gender: String!
        phone: String!
        email: String!
        specialty: String!
        professionalID: String!
        office: String!
        atentionDays: [String!]!
        atentionHours: String!
    }

    type Query{
        allDoctors: [Doctor!]!
        oneDoctor(id: ID!): Doctor
        specialtyDoctors(specialty: String!): [Doctor!]!
    }

    type Mutation{
        addDoctor(name: String!, lastName: String!, gender: String!, phone: String!, email: String!, specialty: String!, professionalID: String!, office: String!, atentionDays: [String!]!, atentionHours: String!): Doctor!
        updateDoctor(id: ID!, name: String, lastName: String, phone: String, email: String, specialty: String, professionalID: String, office: String, atentionDays: [String!], atentionHours: String): Doctor!
        deleteDoctor(id: ID!): Doctor!
    }

    type Subscription{
        doctorAdded: Doctor!
        doctorUpdated: Doctor!
    }
`);