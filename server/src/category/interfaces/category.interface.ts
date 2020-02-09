import { Document } from 'mongoose';

export interface Category extends Document {
  readonly name: string;
  readonly image: string;
  readonly description: string;
}
