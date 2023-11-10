import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { DatabaseModule } from './nest-modules/database-module/database.module';

import { ConfigModule } from './nest-modules/config-module/config.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CategoriesModule,

    // SequelizeModule.forFeature([]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
