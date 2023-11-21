import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: `${configService.get<string>('MONGODB_URI')}/core`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  // imports: [
  //   MongooseModule.forRootAsync({
  //     useClass: DatabaseService,
  //   }),
  // ],
  // providers: [ConfigService],
})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useClass: DatabaseService,
        }),
      ],
      providers: [ConfigService],
    };
  }
}
