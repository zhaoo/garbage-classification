import * as mongoose from 'mongoose';

export const GarbageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  image: String,
  description: String,
  categoryId: String,
  updateTime: {
    type: Date,
    default: new Date(),
  },
});
