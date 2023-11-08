import { Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { join } from 'path';
@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    // return super.forRoot({ isGlobal: true, envFilePath: ['.env1', '.env2'] });

    const { envFilePath, ...otherOptions } = options;
    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
        join(process.cwd(), 'envs', `.env.${process.env.NODE_ENV}`),
        join(process.cwd(), 'envs', `.env`),
      ],

      ...otherOptions,
    });
  }
}
