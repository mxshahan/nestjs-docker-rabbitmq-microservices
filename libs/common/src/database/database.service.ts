import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
@Injectable({ scope: Scope.REQUEST })
export class DatabaseService implements MongooseOptionsFactory {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {
    console.log(99999999, this.request.headers.company);
    return {
      uri:
        this.configService.get<string>('MONGODB_URI') +
        '/' +
        this.request.headers.company,
    };
  }
}
