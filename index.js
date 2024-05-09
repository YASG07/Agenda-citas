const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const schema = fs.readFileSync("./schema.graphql", "utf-8");

let people = [
    
  ];


const resolvers = {
  Query: {
     
  },
  Mutation: {
      
  },
  Suscription: {

  }
};
  
const server = new ApolloServer({
    typeDefs: gql(schema),
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server running on: ${url}`);
})