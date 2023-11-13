import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { ICategoryRepository } from '../../../domain/category.repository';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Category } from '../../../domain/category.entity';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private readonly repo: ICategoryRepository) {}
  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const uuid = new Uuid(input.id);

    const category = await this.repo.findById(uuid);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(category);
    // return {
    //   id: category.category_id.id,
    //   name: category.name,
    //   description: category.description,
    //   created_at: category.created_at,
    //   is_active: category.is_active,
    // };
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;

// export type GetCategoryOutput = {
//   id: string;
//   name: string;
//   description: string;
//   is_active: boolean;
//   created_at: Date;
// };
