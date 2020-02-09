import * as mongoose from 'mongoose';

export const GarbageSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  categoryId: String,
});
