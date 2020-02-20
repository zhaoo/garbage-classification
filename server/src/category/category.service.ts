import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryType } from './dto/category.dto';
import { Category } from './interfaces/category.interface';
import { CategoryInput } from './input-category.input';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CategoryInput): Promise<CategoryType> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  async findAll(): Promise<CategoryType[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<CategoryType> {
    return await this.categoryModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<CategoryType> {
    return await this.categoryModel.findByIdAndRemove(id);
  }

  async update(id: string, item: CategoryInput): Promise<CategoryType> {
    return await this.categoryModel.findByIdAndUpdate(id, item, { new: true });
  }
}
