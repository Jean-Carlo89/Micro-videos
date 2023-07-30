import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import { Entity } from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}
describe("Entity Unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value", prop2: 45 };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value", prop2: 45 };

    const uniqueEntityId = new UniqueEntityId();

    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.props).toStrictEqual(arrange);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();

    expect(entity.id).toStrictEqual(uniqueEntityId.value);
  });

  it("should convert an entity to a javascript Object", () => {
    const arrange = { prop1: "value", prop2: 45 };

    const uniqueEntityId = new UniqueEntityId();

    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
