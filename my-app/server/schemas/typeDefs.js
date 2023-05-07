const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Message {
        description: String!      
    }

    type Query {
        messages: [Message]
    }

    type Mutation {
        saveMessage(description: String!): Message
    }
`;

module.exports = typeDefs;