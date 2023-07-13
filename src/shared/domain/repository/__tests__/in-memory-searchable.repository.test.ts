/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from "../../../../shared/domain/entity/entity";
import { inMemorySearchableRepository } from "../in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends inMemorySearchableRepository<StubEntity> {
    sortableFields: string[] = ["name"];
    protected async applyFilter(
        items: StubEntity[],
        filter: string,
    ): Promise<StubEntity[]> {
        if (!filter) {
            return items;
        }

        return items.filter((i) => {
            return (
                i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
                i.props.price.toString() === filter
            );
        });
    }
}

describe("InMemorySearchableRepository", () => {
    let repository: StubInMemorySearchableRepository;

    beforeEach(() => {
        repository = new StubInMemorySearchableRepository();
    });
    describe("applyFilter method", () => {
        it("should no filter items when filter param is null", async () => {
            const items = [new StubEntity({ name: "name value", price: 5 })];
            const spyFilterMethod = jest.spyOn(items, "filter" as any);
            const itemsFiltered = await repository["applyFilter"](items, null);

            expect(itemsFiltered).toStrictEqual(items);

            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it("should filter using a filter param", async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "TEST", price: 5 }),
                new StubEntity({ name: "fake", price: 0 }),
            ];

            const spyFilterMethod = jest.spyOn(items, "filter" as any);

            let itemsFiltered = await repository["applyFilter"](items, "TEST");

            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);

            expect(spyFilterMethod).toHaveBeenCalled();

            itemsFiltered = await repository["applyFilter"](items, "5");

            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);

            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            itemsFiltered = await repository["applyFilter"](items, "no-filter");

            expect(itemsFiltered).toHaveLength(0);

            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });

    describe("applySort method", () => {
        it("should no sort items", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
            ];

            let itemsSorted = await repository["applySort"](items, null, null);

            expect(itemsSorted).toStrictEqual(items);

            itemsSorted = await repository["applySort"](items, "price", "asc");

            expect(itemsSorted).toStrictEqual(items);
        });

        it("should  sort items", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "c", price: 0 }),
            ];

            let itemsSorted = await repository["applySort"](
                items,
                "name",
                "asc",
            );

            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

            itemsSorted = await repository["applySort"](items, "name", "desc");

            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
        });
    });

    describe("applyPaginate method", () => {
        it("should  paginate items", async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "c", price: 0 }),
                new StubEntity({ name: "d", price: 0 }),
                new StubEntity({ name: "e", price: 0 }),
            ];

            let itemsPaginated = await repository["applyPaginate"](items, 1, 2);

            expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

            itemsPaginated = await repository["applyPaginate"](items, 2, 2);

            expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

            itemsPaginated = await repository["applyPaginate"](items, 3, 2);

            expect(itemsPaginated).toStrictEqual([items[4]]);

            itemsPaginated = await repository["applyPaginate"](items, 4, 2);

            expect(itemsPaginated).toStrictEqual([]);
        });
    });

    describe("Search method", () => {});
});
