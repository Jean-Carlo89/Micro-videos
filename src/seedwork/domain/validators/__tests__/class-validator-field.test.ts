import { ClassValidatorfields } from "../class-validator-field";
import * as libClassValidator from "class-validator";
class StubClassValidatorFields extends ClassValidatorfields<{ field: string }> {}

describe("class validator filed unit tests", () => {
  it("should initialize errors and validate data variables with null", () => {
    const validator = new StubClassValidatorFields();

    expect(validator.errors).toBeNull();

    expect(validator.validatedData).toBeNull();
  });

  it("should initialize errors and validate data variables with null", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      {
        property: "field",
        constraints: { isRequired: "some error" },
      },
    ]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();

    expect(validator.errors).toStrictEqual({ field: ["some error"] });
  });

  it("should initialize errors and validate data variables without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: "value" });

    expect(validator.errors).toBeNull();
  });
});
