import { UseCase } from "shared/application/use-case";

import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export class GetCategoryUseCase implements UseCase<Input, Output> {
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
