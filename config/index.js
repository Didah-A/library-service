require('dotenv').config();

const connectDB = () => {
    /* Mongo database configuration */
    try {
    const mongoose = require('mongoose');
    mongoose.connect(`${process.env.DIALECT}://${process.env.HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    connectDB
}