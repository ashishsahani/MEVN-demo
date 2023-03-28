const mongoose = require('../../commons/db');
const schema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
    unique: true
  }
});
const providers = mongoose.model('providers', schema);

module.exports  = providers;