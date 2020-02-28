import { Resolver, Query } from '@nestjs/graphql';
import { DashboardType } from './dto/dashboard.dto';
import { GarbageService } from '../garbage/garbage.service';

@Resolver()
export class DashboardResolver {
  constructor(private readonly garbageService: GarbageService) { }

  @Query(() => DashboardType)
  async dashboard(): Promise<DashboardType> {
    const garbageCount = await this.garbageService.count();
    return {garbageCount};
  }
}
