//const messages = [];
const { AuthenticationError } = require('apollo-server-express');
const { User, Message } = require('../models');
const { signToken } = require('../utils/auth');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = {

    Query: {

        users: async () => {
            return User.find().populate('messages');
        },
          
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('messages');
        },

        // messages: async () => {
          //  return messages;
        //},

        messages: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Message.find(params);
        },
        message: async (parent, { messageId }) => {
            return Message.findOne({ _id: messageId });
          },
    },

    Mutation: {

        addUser: async (parent, { username, email, password }) => {
            // First we create the user
            const user = await User.create({ username, email, password });
            // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
            const token = signToken(user);
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
            const user = await User.findOne({ email });
      
            // If there is no user with that email address, return an Authentication error stating so
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPw = await user.isCorrectPassword(password);
      
            // If the password is incorrect, return an Authentication error stating so
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            // If email and password are correct, sign user into the application with a JWT
            const token = signToken(user);
      
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
          },

    
        addMessage: async (parent, { description }) => {
            const message = await Message.create({ description });
            pubsub.publish('MESSAGE_ADDED', { messageAdded: message });
            return message;
          },

        updateMessage: async (parent, { _id, description}) => {
            try{
                return await Message.findOneAndUpdate(
                    {_id}, 
                    { description }, 
                    {new:true} 
                );
            } catch (error) {
                throw new Error(`Failed to update message: ${error.message}`);
            }
            
      
        },

        deleteMessage: async (parent, {_id }) => {
            return await Message.findOneAndDelete({ _id });
          },
    },

    Subscription: {
        messageAdded: {
          subscribe: (_, { description }) => {
            return pubsub.asyncIterator('MESSAGE_ADDED_${description');
          },
          resolve: (payload) => {
            return payload;
          },
        },
      },
}