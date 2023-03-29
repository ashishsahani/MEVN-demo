const mongoose =require('mongoose');

async function main() {
    await mongoose.connect('mongodb://db:27017/merndb');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();

module.exports = mongoose