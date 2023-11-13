import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { CategorySequelizeRepository } from '@core/category/infra/db/sequelize/category-sequelize.repository';
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.use-case';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { CATEGORY_PROVIDERS, USE_CASES } from './categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
  // providers: [
  //   {
  //     provide: CategorySequelizeRepository,
  //     useFactory: (categoryModel: typeof CategoryModel) =>
  //       new CategorySequelizeRepository(categoryModel),
  //     inject: [getModelToken(CategoryModel)],
  //   },

  //   {
  //     provide: CreateCategoryUseCase,
  //     useFactory: (categoryRepo: ICategoryRepository) =>
  //       new CreateCategoryUseCase(categoryRepo),
  //     inject: [CategorySequelizeRepository],
  //   },
  // ],
})
export class CategoriesModule {}
