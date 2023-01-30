import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { Entity } from "./entity";
class StubEntity extends Entity<{ prop1: string; prop2: number }> {}
describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "prop' value", prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.uniqueEntityId).not.toBeNull();
  });
});
