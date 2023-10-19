import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/core/.env',
    }),
    DatabaseModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
