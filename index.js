const { ApolloServer } = require('apollo-server');
const userSchema = require('./schemas/user.schema');
const { userResolver } = require('./resolvers/user.resolver'); 

const server = new ApolloServer({
    typeDefs: [userSchema],
    resolvers: userResolver
});

server.listen().then(({ url }) => {
    console.log(`Servidor en ${url}`)
});