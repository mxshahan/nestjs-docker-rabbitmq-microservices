import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

interface DatabaseModuleOptions {
  name: string;
}

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
})
export class DatabaseModule {
  static register({ name }: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return {
              uri: configService.get<string>('MONGODB_URI') + '/' + name,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
