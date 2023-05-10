const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
        messages: [Message]!
    }


    type Message {
        _id: ID!
        description: String!      
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        messages: [Message]
        message(_id: ID!): Message
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveMessage(description: String!): Message
        createMessage(description: String!): Message
        updateMessage(_id: ID!, descriptionn: String): Message
        deleteMessage(id:String!): Boolean
    }
`;

module.exports = typeDefs;