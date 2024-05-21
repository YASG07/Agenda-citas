const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const mongoose = require('mongoose');

// Schemas
const userSchema = require('./schemas/user.schema');
const appointmentSchema = require('./schemas/appointment.schema');
const doctorSchema = require('./schemas/doctors.schema');

// Resolvers
const { userResolver } = require('./resolvers/user.resolver');
const { appointmentResolver } = require('./resolvers/appointment.resolver');
const { doctorResolver } = require('./resolvers/doctor.resolver');

// Conexion a Mongo Atlas
const MONGODB = "mongodb+srv://admin:admin@subscriptionserver.aeltz5n.mongodb.net/?retryWrites=true&w=majority&appName=SubscriptionServer";

const schema = makeExecutableSchema({
    typeDefs: [userSchema, appointmentSchema, doctorSchema],
    resolvers: [userResolver, appointmentResolver, doctorResolver]
});

(async function() {
    const app = express();
    const httpServer = createServer(app);

    const server = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            }
        ]
    });

    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Conectado a MongoDB');
            const PORT = 4000;
            httpServer.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
                new SubscriptionServer(
                    { execute, subscribe, schema },
                    { server: httpServer, path: server.graphqlPath }
                );
            });
        })
        .catch(err => {
            console.error('Error al conectar a MongoDB', err);
        });
})();
