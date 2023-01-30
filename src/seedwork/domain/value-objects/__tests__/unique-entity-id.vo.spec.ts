import { randomUUID } from "crypto";
import { InvalidUuidError } from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }

const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

beforeEach(() => {
  validateSpy.mockClear();
});

describe("Unique entity id test", () => {
  it("should throw error when uuid is invalid", () => {
    //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("fake id")).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept uuid passed in constructor", () => {
    // const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = "4d6d6e65-2406-42e4-903c-7d85cfb637ff";

    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toStrictEqual(uuid);
    expect(validateSpy).toHaveBeenCalled();
    //expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should accept uuid passed in constructor", () => {
    // const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

    const vo = new UniqueEntityId();

    expect(vo.value).toBeTruthy();

    expect(validateSpy).toHaveBeenCalled();
  });
});
