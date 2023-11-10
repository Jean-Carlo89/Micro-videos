import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
//import { DatabaseModule } from 'src/database/database.module';
//import { DatabaseModule } from 'src/database-module/database.module';
import { DatabaseModule } from '@core/../../src/nest-modules/database-module/database.module';
import { CategoriesModule } from './categories.module';
// import { ConfigModule } from 'src/config-module/config.module';
import { ConfigModule } from '@core/../../src/nest-modules/config-module/config.module';
import { ConfigService } from '@nestjs/config';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [DatabaseModule, SequelizeModule.forFeature([CategoryModel])],

      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],

      //** do not need it anymore because it is inside categories module */
      // providers: [
      //   {
      //     provide: CategorySequelizeRepository,
      //     useFactory: (categoryModel: typeof CategoryModel) =>
      //       new CategorySequelizeRepository(categoryModel),
      //     inject: [getModelToken(CategoryModel)],
      //   },
      // ],
      // controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);

    console.log(module.get(ConfigService).get('DB_HOST'));
  });

  it('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
