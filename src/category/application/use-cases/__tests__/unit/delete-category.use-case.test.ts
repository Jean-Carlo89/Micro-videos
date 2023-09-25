import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError, Uuid } from "../../../../../shared/domain/value-object/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

describe("Delete CAtegory use case unit tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repo: CategoryInMemoryRepository;

  beforeEach(() => {
    repo = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repo);
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
});
