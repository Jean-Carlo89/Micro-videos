// import { Category } from "../../domain/entitites/category";
import { Category } from "#category/domain/entities/category";

import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
    let repository: CategoryInMemoryRepository;

    beforeEach(() => (repository = new CategoryInMemoryRepository()));

    it("should sorted by name", async () => {
        const items = [
            new Category({ name: "a" }),
            new Category({ name: "b" }),
            new Category({ name: "c" }),
        ];

        let sorted_items = await repository["applySort"](items, "name", "asc");
        expect(sorted_items).toStrictEqual([items[0], items[1], items[2]]);

        sorted_items = await repository["applySort"](items, "name", "desc");
        expect(sorted_items).toStrictEqual([items[2], items[1], items[0]]);
    });

    it("should sort by created_at field if sort  is null", async () => {
        const created_at = new Date();
        const items = [
            new Category({ name: "test", created_at: created_at }),
            new Category({
                name: "testing",
                created_at: new Date(created_at.getTime() + 100),
            }),
            new Category({
                name: "testing-fake",
                created_at: new Date(created_at.getTime() + 200),
            }),
        ];

        let sorted_items = await repository["applySort"](items, null, null);
        expect(sorted_items).toStrictEqual([items[2], items[1], items[0]]);
    });
});
