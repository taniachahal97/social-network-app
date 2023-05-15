const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const http = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const path = require('path');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection.js')

const app = express();

const PORT = 3001;
const WS_PORT = 3002; // New port for WebSocket server

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

const httpServer = http.createServer(app);



SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema: apolloServer.schema,
  },
  {
    server: httpServer,
    path: '/subscriptions',
  }
);

const startServer = async () => {
  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  db.once('open', () => {
  httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);

      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema: apolloServer.schema,
        },
        {
          server: httpServer,
          path: '/subscriptions',
        }
      );
      console.log(`WebSocket server running on port ${WS_PORT}!`);
    });
  });
}

startServer();
