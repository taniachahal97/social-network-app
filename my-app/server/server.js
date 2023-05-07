const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const app = express();

const PORT = 3001;

app.use(express.static(path.join(__dirname, '../client/build')));

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });


  const startServer = async () => {
    await apolloServer.start()
    apolloServer.applyMiddleware({app})

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
}

startServer();
