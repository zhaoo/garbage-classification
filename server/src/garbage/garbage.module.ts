import { Module } from '@nestjs/common';
import { GarbageService } from './garbage.service';
import { GarbageResolver } from './garbage.resolver';
import { GarbageSchema } from './garbage.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Garbage', schema: GarbageSchema }])],
  providers: [GarbageService, GarbageResolver],
})
export class GarbageModule { }
