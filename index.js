const { ApolloServer } = require('apollo-server');

// Schemas
const userSchema = require('./schemas/user.schema');
const appointmentSchema = require('./schemas/appointment.schema');

// Resolvers
const { userResolver } = require('./resolvers/user.resolver'); 
const { appointmentResolver } = require('./resolvers/appointment.resolver');

const server = new ApolloServer({
    typeDefs: [userSchema, appointmentSchema],
    resolvers: [userResolver, appointmentResolver]
});

server.listen().then(({ url }) => {
    console.log(`Servidor en ${url}`)
});
