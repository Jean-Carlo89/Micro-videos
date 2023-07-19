import { UseCase } from "shared/application/use-case";

import { Category } from "../../../category/domain/entitites/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
        const entity = await this.categoryRepo.findById(input.id);

        await this.categoryRepo.delete(entity.id);

        return CategoryOutputMapper.toOutput(entity);
    }
}

export type Input = {
    id: string;
};

export type Output = CategoryOutput;
