const messages = [];

module.exports = {

    Query: {
        messages: async () => {
            return messages;
        }
    },

    Mutation: {
        saveMessage: async (parent, args) => {
            const message = {
                description: args.description,
            }

            return message;
        }
    }
}