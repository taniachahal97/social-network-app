const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    description: {
    type: String,
    required: 'You need to leave a message!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  }
});

const Message = model('Message', messageSchema);

module.exports = Message;
