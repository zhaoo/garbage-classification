import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GarbageType } from './dto/create-garbage.dto';
import { Garbage } from './interfaces/garbage.interface';
import { GarbageInput } from './input-garbage.input';

@Injectable()
export class GarbageService {
  constructor(@InjectModel('Garbage') private garbageModel: Model<Garbage>) { }

  async findByCategoryId(categoryId: string): Promise<GarbageType[]> {
    return await this.garbageModel.find({ categoryId });
  }

  async create(createGarbageDto: GarbageInput): Promise<GarbageType> {
    const createdGarbage = new this.garbageModel(createGarbageDto);
    return await createdGarbage.save();
  }

  async findAll(): Promise<GarbageType[]> {
    return await this.garbageModel.find().exec();
  }

  async findOne(id: string): Promise<GarbageType> {
    return await this.garbageModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<GarbageType> {
    return await this.garbageModel.findByIdAndRemove(id);
  }

  async update(id: string, item: GarbageInput): Promise<GarbageType> {
    return await this.garbageModel.findByIdAndUpdate(id, item, { new: true });
  }
}
