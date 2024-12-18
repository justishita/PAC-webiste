const mongoose = require('mongoose');
require('dotenv').config(); 

async function DBconnect() {
    try {
        await mongoose.connect(process.env.mongodbURL);
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Failed to connect to MongoDB : ', err);
        process.exit(1);
    }
}
module.exports = DBconnect;

