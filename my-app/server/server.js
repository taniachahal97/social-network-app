const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');
const app = express();

const PORT = 3001;

app.use(express.static(path.join(__dirname, '../client/build')));

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
  
const startServer = async () => {
  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  db.once('open', () => {
  app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
  })
}

startServer();
