// Models/db.js
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN; // Access the connection string from environment variables

mongoose.connect(mongo_url)
    .then(() => console.log('Mongo DB connected')) // Log success
    .catch((err) => console.log('MongoDB Connection error:', err)); // Log specific error
