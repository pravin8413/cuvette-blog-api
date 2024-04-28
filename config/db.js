const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function db()
{
    await mongoose.connect(process.env.MONGODB_URL);
}


module.exports = db;