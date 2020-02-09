import { Document } from 'mongoose';

export interface Garbage extends Document {
  readonly name: string;
  readonly image: string;
  readonly description: string;
  readonly categoryId: string;
}
