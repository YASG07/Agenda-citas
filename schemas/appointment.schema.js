const { gql }  = require('apollo-server');

module.exports = gql(`
    type Appointment {
        id: ID!
        date: String!
        time: String!
        treatment: String!
        patient: Person!
        price: Float
        address: String!
        doctor: String!
    }

    type Person {
        name: String!
        lastName: String!
        phone: String
        email: String
    }

    type Query {
        allAppointments: [Appointment!]! 
        oneAppointment(id: ID!): Appointment 
    }

    input personInput {
        name: String!
        lastName: String!
        phone: String
        email: String
    }

    type Mutation {
        addAppointment(date: String!, time: String!, treatment: String!, patient: personInput, price: Float, address: String!, doctor: String!): Appointment!
        updateAppointment(id: ID!, date: String!, time: String!, address: String!, doctor: String!): Appointment!
        deleteAppointment(id: ID!): Appointment!
    }

    type Suscription {
        appointmentAdded: Appointment
        appointmentChanged: Appointment!
        appointmentCanceled: Appointment!
    }
`)
