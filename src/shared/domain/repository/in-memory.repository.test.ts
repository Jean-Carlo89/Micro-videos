import { Entity } from "../../../shared/domain/entity/entity";
import { NotFoundError } from "../errors/not-found.error";
import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import { inMemoryRepository } from "./in-memory.repository";
type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends inMemoryRepository<StubEntity> {}
describe("In Memory repository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "value", price: 5 });

    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error when entity not found", async () => {
    expect(repository.findById("fake id")).rejects.toThrow(new NotFoundError(`Entity not found using id : fake id`));

    expect(repository.findById(new UniqueEntityId("73c924e6-33bc-4251-962d-267325e11230"))).rejects.toThrow(new NotFoundError(`Entity not found using id : 73c924e6-33bc-4251-962d-267325e11230`));
  });

  it("Should find an entity by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });

    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("Should return all entities by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });

    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("Should throw error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });

    expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity not found using id : ${entity.id}`));
  });

  it("Should throw error on delete when entity not found", async () => {
    expect(repository.delete("fake id")).rejects.toThrowError(new NotFoundError(`Entity not found using id : fake id`));

    expect(repository.delete(new UniqueEntityId("73c924e6-33bc-4251-962d-267325e11230"))).rejects.toThrow(new NotFoundError(`Entity not found using id : 73c924e6-33bc-4251-962d-267325e11230`));
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });

    await repository.insert(entity);

    const entityUpdated = new StubEntity({ name: "updated", price: 1 }, entity.uniqueEntityId);

    await repository.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should delete an entity", async () => {
    let entity = new StubEntity({ name: "name value", price: 5 });

    await repository.insert(entity);

    await repository.delete(entity.id);

    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);

    expect(repository.items).toHaveLength(0);
  });
});
