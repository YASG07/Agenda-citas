const { ApolloServer } = require('apollo-server');

// Schemas
const userSchema = require('./schemas/user.schema');
const appointmentSchema = require('./schemas/appointment.schema');
const doctorSchema = require('./schemas/doctors.schema');

// Resolvers
const { userResolver } = require('./resolvers/user.resolver'); 
const { appointmentResolver } = require('./resolvers/appointment.resolver');
const { doctorResolver } = require('./resolvers/doctor.resolver');

const server = new ApolloServer({
    typeDefs: [userSchema, appointmentSchema, doctorSchema],
    resolvers: [userResolver, appointmentResolver, doctorResolver]
});

server.listen().then(({ url }) => {
    console.log(`Servidor en ${url}`)
});
