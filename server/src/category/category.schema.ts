import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
