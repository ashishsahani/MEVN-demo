const mongoose = require('../../commons/db');
const ClientSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  providers: [
    {
      id: {
        type: String,
        required: true,
      }
    }
  ]
});
const clients = mongoose.model('clients', ClientSchema);

module.exports  = clients;