import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../../category/infra/repository/category-in-memory.repository";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { DeleteCategoryUseCase } from "../delete-category.use-case";
import { GetCategoryUseCase } from "../get-category.use-case";

describe("CreateCategoryUseCase", () => {
    let useCase: DeleteCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase(repository);
    });

    //"should throw error when entity not found"

    it("should throw error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
            new NotFoundError(`Entity not found using id : fake id`),
        );
    });

    it("should delete a category", async () => {
        const spyFindById = jest.spyOn(repository, "delete");

        const items = [new Category({ name: "Movie" })];

        repository.items = items;

        expect(repository.items).toHaveLength(1);

        await useCase.execute({ id: items[0].id });

        console.log(repository.items);

        expect(spyFindById).toHaveBeenCalledTimes(1);

        expect(repository.items).toHaveLength(0);
    });
});
