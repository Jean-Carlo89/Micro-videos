import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { UniqueEntityId } from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}
describe("UniqueEntityId Unit tests", () => {
    it("should  throw error when uuid is invalid", () => {
        //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        const validateSpy = spyValidateMethod();
        expect(() => new UniqueEntityId("fake id")).toThrow(
            new InvalidUuidError(),
        );

        expect(validateSpy).toHaveBeenCalled();
    });

    it("should  accept a uui passed in constructor", () => {
        //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        const validateSpy = spyValidateMethod();
        const uuid = "b9b11bb6-e9f1-4efa-b31b-ee0f8785f755";
        const vo = new UniqueEntityId(uuid);

        expect(vo.id).toStrictEqual(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it("should  accept a uui passed in constructor", () => {
        //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        const validateSpy = spyValidateMethod();
        // const uuid = "b9b11bb6-e9f1-4efa-b31b-ee0f8785f755";
        const vo = new UniqueEntityId();

        expect(uuidValidate(vo.value)).toBeTruthy();

        expect(validateSpy).toHaveBeenCalled();
    });
});
