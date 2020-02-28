import { Module } from '@nestjs/common';
import { DashboardResolver } from './dashboard.resolver';
import { GarbageModule } from '../garbage/garbage.module';

@Module({
  imports: [GarbageModule],
  providers: [DashboardResolver],
})
export class DashboardModule {}
