const messages = [];
const { AuthenticationError } = require('apollo-server-express');
const { User, Message } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {

    Query: {

        users: async () => {
            return User.find().populate('messages');
        },
          
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('messages');
        },

        messages: async () => {
            return messages;
        }
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

        saveMessage: async (parent, args) => {
            const message = {
                _id: 1,
                description: args.description,
            }
            messages.push(message);
            return message;
        },

        updateMessage: async (parent, { messageId, description}) => {
            try{
                return Message.findOneAndUpdate({_id: messageId}, { description }, {new:true});
            } catch (error) {
                throw new Error(`Failed to update message: ${error.message}`);
            }
            
      
        },

        deleteMessage: async (parent, { messageId }) => {
            return Thought.findOneAndDelete({ _id: messageId });
          },
    }
}