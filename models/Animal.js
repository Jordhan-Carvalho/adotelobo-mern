const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  authorName: String,
  name: { type: String, required: true },
  image: String,
  image2: String,
  image3: String,
  description: { type: String, required: true },
  sex: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  contact: { tel: String, email: String, zap: String },
});

module.exports = Animal = mongoose.model('animal', AnimalSchema);
