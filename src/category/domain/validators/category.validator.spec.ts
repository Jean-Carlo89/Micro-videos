import { CategoryValidatorFactory, CategoryValidator, CategoryRules } from "../validators/category.validator";
describe("Category integration tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });
  it("should a invalid category using name property", () => {
    let isValid = validator.validate(null);

    expect(isValid).toBeFalsy();

    expect(validator.errors["name"]).toStrictEqual(["name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"]);

    isValid = validator.validate({ name: "" });
    expect(validator.errors["name"]).toStrictEqual(["name should not be empty"]);

    isValid = validator.validate({ name: 5 as any });
    expect(validator.errors["name"]).toStrictEqual(["name must be a string", "name must be shorter than or equal to 255 characters"]);

    isValid = validator.validate({ name: "t".repeat(300) });
    expect(validator.errors["name"]).toStrictEqual(["name must be shorter than or equal to 255 characters"]);
  });

  it("valid class for fields", () => {
    const name = "some value";
    const arrange = [
      {
        name: name,
        description: null,
      },
      {
        name: name,
        description: undefined,
      },
      {
        name: name,
        is_active: true,
      },
      {
        name: name,
        is_active: false,
      },
    ];

    arrange.forEach((item) => {
      const isValid = validator.validate(item);

      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
    });
    // let isValid = validator.validate({ name: "some value" });

    // expect(isValid).toBeTruthy();

    // isValid = validator.validate({ name: "some value" });
    // expect(isValid).toBeTruthy();
    // isValid = validator.validate({ name: "some value", description: null });
    // expect(isValid).toBeTruthy();
    // isValid = validator.validate({ name: "some value", description: undefined });
    // expect(isValid).toBeTruthy();
    // isValid = validator.validate({ name: "some value", is_active: true });
    // // console.log(validator.errors);
    // expect(isValid).toBeTruthy();
    // isValid = validator.validate({ name: "some value", is_active: false });
    // expect(isValid).toBeTruthy();
  });
});
