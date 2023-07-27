import { UseCase } from "shared/application/use-case";
import { SortDirection } from "shared/domain/repository/repository-contracts";

import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { PaginationOutputMapper } from "../../../shared/application/dto/pagination-output";
import { PaginationOutputDto } from "../../../shared/application/dto/pagination-output";
import { SearchInputDto } from "../../../shared/application/dto/search-input";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export class ListCategoriesUseCase implements UseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
        const params = new CategoryRepository.SearchParams(input);
        const searchResult = await this.categoryRepo.search(params);

        return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
        const items = searchResult.items.map((i) => {
            return CategoryOutputMapper.toOutput(i);
        });

        const pagination = PaginationOutputMapper.toOutput(searchResult);

        return {
            items,
            ...pagination,
        };
        // return {
        //     items: searchResult.items.map((i) => {
        //         return {
        //             id: i.id,
        //             name: i.name,
        //             description: i.description,
        //             is_active: i.is_active,
        //             created_at: i.created_at,
        //         };
        //     }),
        //     ...PaginationOutputMapper.toPaginationOutput(searchResult),
        // };
    }
}
export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;

// export type Output = {
//     items: CategoryOutput[];
//     total: number;
//     current_page: number;
//     last_page: number;
//     per_page: number;
// };
