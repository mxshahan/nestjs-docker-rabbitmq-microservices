import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
