import { Category } from "../../../../category/domain/entitites/category";
import { CategoryInMemoryRepository } from "../../../../category/infra/repository/category-in-memory.repository";
import { GetCategoryUseCase } from "../get-category.use-case";

describe("CreateCategoryUseCase", () => {
    let useCase: GetCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    //"should throw error when entity not found"

    it("should throw error when entity not found", async () => {
        await expect(() =>
            useCase.execute({ id: "fake id" }),
        ).rejects.toThrowError(`Entity not found using id : fake id`);
    });

    it("should throw error when entity not found", async () => {
        const spyFindById = jest.spyOn(repository, "findById");

        const items = [new Category({ name: "Movie" })];

        repository.items = items;

        const output = await useCase.execute({ id: items[0].id });

        expect(spyFindById).toHaveBeenCalledTimes(1);

        expect(output).toStrictEqual({
            id: items[0].id,
            name: "Movie",
            description: null,
            is_active: true,
            created_at: items[0].created_at,
        });
    });
});
