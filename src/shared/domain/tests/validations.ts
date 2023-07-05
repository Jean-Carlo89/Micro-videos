import { ClassValidatorFields } from "../validators/class-validator";
import { FieldErrors } from "../validators/validator-fields-interface";
import { objectContaining } from "expect";
import { EntityValidationError } from "../errors/validation-error";

// //type Expected = { validator: ClassValidatorFields<any>; data: any };

type Expected = { validator: ClassValidatorFields<any>; data: any } | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;

        return assertContainsErrorMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorMessages(validator.errors, received);
    }
  },
});

function isValid() {
  return { pass: true, message: () => "" };
}

function assertContainsErrorMessages(expected: FieldErrors, received: FieldErrors) {
  const isMatch = objectContaining(received).asymmetricMatch(expected);

  //const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors);

  return isMatch ? { pass: true, message: () => "" } : { pass: false, message: () => `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}` };
}

// containsErrorMessages(expected: Expected, received: FieldErrors) {
//   const { validator, data } = expected;
//   const isValid = validator.validate(data);

//   if (isValid) {
//     return {
//       pass: false,
//       message: () => "The data is valid",
//     };
//   }

//   const isMatch = objectContaining(received).asymmetricMatch(validator.errors);

//   //const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors);

//   return isMatch ? { pass: true, message: () => "" } : { pass: false, message: `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(validator.errors)}` };
// },
