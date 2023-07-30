import { UseCase as DefaultUseCase } from 'shared/application/use-case';

import { CategoryRepository } from '../../../category/domain/repository/category.repository';
import { Category } from '../../domain/entities/category';
import { CategoryOutput } from '../dto/category-output';

export namespace GetCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) {}

        async execute(input: Input): Promise<Output> {
            const entity = await this.categoryRepo.findById(input.id);

            return {
                id: entity.id,
                name: entity.name,
                description: entity.description,
                is_active: entity.is_active,
                created_at: entity.created_at,
            };
        }
    }

    export type Input = {
        id: string;
    };

    export type Output = CategoryOutput;
}
