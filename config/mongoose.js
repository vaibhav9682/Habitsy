const mongoose = require('mongoose');
const Db = process.env.mongoDb_url;
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(Db);
    console.log('it is connected to database');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}