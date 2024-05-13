const { gpl }  = require('apollo-server');

module.exports = gql(`
    type Appointment {
        id: ID!
        date: String!
        time: String!
        treatment: String!
        patient: Person!
        price: Float
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
        addAppointment(id: ID!, date: String!, time: String!, treatment: String!, patient: personInput, price: Float): Appointment!
        updateAppointment(id: ID!, date: String!, time: String!): Appointment!
        deleteAppointment(id: ID!): Appointment!
    }

    type Suscription {
        appointmentAdded: Appointment
        appointmentChanged: Appointment!
        appointmentCanceled: Appointment!
    }
`)
