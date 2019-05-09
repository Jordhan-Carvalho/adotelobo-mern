const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connect');
  } catch (error) {
    console.log(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
