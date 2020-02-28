import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GarbageType } from './dto/garbage.dto';
import { GarbagePaginationType } from './dto/garbage-pagination.dto';
import { Garbage } from './interfaces/garbage.interface';
import { GarbageInput } from './input-garbage.input';

@Injectable()
export class GarbageService {
  constructor(@InjectModel('Garbage') private garbageModel: Model<Garbage>) { }

  async findByCategoryId(categoryId: string): Promise<GarbageType[]> {
    return await this.garbageModel.find({ categoryId });
  }

  async findBySearch(keyword: string): Promise<GarbageType[]> {
    return await this.garbageModel.find({ $or: [{ name: { $regex: keyword } }] });
  }

  async count(): Promise<number> {
    return await this.garbageModel.count({});
  }

  async findByCondition(current: number, limit: number, keyword = '', categoryId?: string): Promise<GarbagePaginationType> {
    let query: any
    if (categoryId) {
      query = { $and: [{ name: { $regex: keyword } }, { categoryId }] };
    } else {
      query = { $and: [{ name: { $regex: keyword } }] };
    }
    const list = await this.garbageModel.find(query).skip((current - 1) * limit).limit(limit).exec();
    const total = await this.garbageModel.count(query);
    return { list, total };
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
