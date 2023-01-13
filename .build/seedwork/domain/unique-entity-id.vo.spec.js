"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_uuid_error_1 = require("../../seedwork/errors/invalid-uuid.error");
const unique_entity_id_vo_1 = __importDefault(require("./unique-entity-id.vo"));
// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }
const validateSpy = jest.spyOn(unique_entity_id_vo_1.default.prototype, "validate");
beforeEach(() => {
    validateSpy.mockClear();
});
describe("Unique entity id test", () => {
    it("should throw error when uuid is invalid", () => {
        //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        expect(() => new unique_entity_id_vo_1.default("fake id")).toThrowError(new invalid_uuid_error_1.InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });
    it("should accept uuid passed in constructor", () => {
        // const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        const uuid = "4d6d6e65-2406-42e4-903c-7d85cfb637ff";
        const vo = new unique_entity_id_vo_1.default(uuid);
        expect(vo.id).toStrictEqual(uuid);
        expect(validateSpy).toHaveBeenCalled();
        //expect(validateSpy).toHaveBeenCalledTimes(2);
    });
    it("should accept uuid passed in constructor", () => {
        // const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
        const vo = new unique_entity_id_vo_1.default();
        expect(vo.id).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
