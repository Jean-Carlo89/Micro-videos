import { ClassValidatorfields } from "../validators/class-validator-field";
import { FieldsErrors } from "../validators/validator-fields-interface";

type Expected = { validator: ClassValidatorfields<any>; data: any };

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const isValid = expected.validator.validate(expected.data);

    const { validator, data } = expected;
    if (isValid) {
      return { pass: false, message: () => "The data is valid" };
    }

    const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors);

    return isMatch
      ? { pass: true, message: () => "" }
      : {
          pass: false,
          message: () => `The validation errors not contains 
          ${JSON.stringify(received)}. 
    Current ${JSON.stringify(validator.errors)}  `,
        };
  },
});
