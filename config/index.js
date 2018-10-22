require('dotenv').config();

const connectDB = () => {
    /* Mongo database configuration */
    try {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.DB, { useNewUrlParser: true });
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    connectDB
}