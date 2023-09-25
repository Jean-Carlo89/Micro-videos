import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError, Uuid } from "../../../../../shared/domain/value-object/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { GetCategoryUseCase } from "../../get-category.use-case";

describe("Get CAtegory use case unit tests", () => {
  let useCase: GetCategoryUseCase;
  let repo: CategoryInMemoryRepository;

  beforeEach(() => {
    repo = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repo);
  });

  it("should throw error  when entity not found", async () => {
    await expect(async () => {
      await useCase.execute({ id: "fake id" });
    }).rejects.toThrow(new InvalidUuidError());

    const uuid = new Uuid();

    await expect(async () => {
      await useCase.execute({ id: uuid.id });
    }).rejects.toThrow(new NotFoundError(uuid.id, Category));

    // throw new NotFoundError(uuid.id, Category);
  });

  it("should return na category", async () => {
    const items = [Category.create({ name: "Movie" })];

    repo.items = items;

    const spyFindById = jest.spyOn(repo, repo.findById.name as any);

    const output = await useCase.execute({ id: items[0].category_id.id });

    expect(spyFindById).toHaveBeenCalledTimes(1);

    expect(output).toStrictEqual({
      id: items[0].category_id.id,
      name: "Movie",
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
  });
});
