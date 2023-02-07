import { ValidationError } from "../../errors/validation-error";

import { ValidatorRules } from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

//** 1st */
// function assertIsInvalid({ value, property, rule, error, params = [] }) {
//   expect(() => {
//     ValidatorRules.values(value, property)[rule](...params);
//   }).toThrow(error);
// }

// function assertIsValid({ value, property, rule, error, params = [] }) {
//   expect(() => {
//     ValidatorRules.values(value, property)[rule](...params);
//   }).not.toThrow(error);
// }

//**2nd */
// function assertIsInvalid({ value, property, rule, error, params = [] }: ExpectedRule) {
//   // const params = props.params;
//   // expect(() => {
//   //   ValidatorRules.values(props.value, props.property)[props.rule](...params);
//   // }).toThrow(props.error);

//   expect(() => {
//     const validator = ValidatorRules.values(value, property);

//     const method = validator[rule];

//     // method.call(validator, ...params);
//     method.apply(validator, ...params);
//   }).toThrow(error);
// }

// function assertIsValid3(props: ExpectedRule) {
//   // const params = props.params;
//   // expect(() => {
//   //   ValidatorRules.values(props.value, props.property)[props.rule](...params);
//   // }).not.toThrow(props.error);

//   const params = props.params;
//   expect(() => {
//     const validator = ValidatorRules.values(props.value, props.property);

//     const method = validator[props.rule];
//     method.apply(validator, props.params);
//   }).not.toThrow(props.error);
// }

//**3 */
function assertIsInvalid(props: ExpectedRule) {
  expect(() => {
    runRule(props);
  }).toThrow(props.error);
}
function assertIsValid(props: ExpectedRule) {
  expect(() => {
    runRule(props);
  }).not.toThrow(props.error);
}

function runRule({ value, property, rule, error, params = [] }: ExpectedRule) {
  //** Typescript error */
  // const validator = ValidatorRules.values(value, property);
  // const method = validator[rule];
  // method.apply(validator, params);

  //*A segunda linha faz um casting para o tipo da função que normaliza para todas as regras de validação existentes, porque o tipo diz que será uma função que aceita qualquer argumento e que retorna um ValidatorRules.

  //*  (...args: any[]) //Será uma função que aceita qualquer tipo de argumento, por causa do `...args: any[]`

  //* => ValidatorRules // A função retornará um tipo ValidatorRules
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as (...args: any[]) => ValidatorRules;
  method.apply(validator, params);
}

describe("Validator rules unit tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("Some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);

    expect(validator["value"]).toStrictEqual("Some value");
    expect(validator["property"]).toStrictEqual("field");
  });

  test("Required validation rule", () => {
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: null, property: "field" },
      { value: "", property: "field" },
    ];
    const error = new ValidationError("The field is required");
    arrange.forEach((item) => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "required", error: error });
    });

    // // arrange.forEach((item) => {
    // //   expect(() => {
    // //     ValidatorRules.values(item.value, item.property).required();
    // //   }).toThrow(new ValidationError(item.messageError));
    // // });

    //valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({ value: item.value, property: item.property, rule: "required", error: error });
    });

    // arrange.forEach((item) => {
    //   expect(() => {
    //     ValidatorRules.values(item.value, item.property).required();
    //   }).not.toThrow(item.messageError);
    // });
  });

  test("String validation rule", () => {
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },

      { value: false, property: "field" },
    ];
    const error = new ValidationError("The field must be a string");
    arrange.forEach((item) => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "string", error: error });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "test", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({ value: item.value, property: item.property, rule: "string", error: error });
    });
  });

  test("Boolean validation rule", () => {
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },

      { value: "false", property: "field" },
    ];
    const error = new ValidationError("The field must be a boolean");
    arrange.forEach((item) => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "boolean", error: error });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      // { value: "test", property: "field" },
      { value: true, property: "field" },

      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({ value: item.value, property: item.property, rule: "boolean", error: error });
    });
  });

  test("Max length validation rule", () => {
    let arrange: Values[] = [
      { value: "aaaaaa", property: "field" },
      // { value: {}, property: "field" },
      // { value: null, property: "field" },
      // { value: false, property: "field" },
    ];
    const error = new ValidationError(`The field must be less or equal than 5 characters`);
    arrange.forEach((item) => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "maxLength", error: error, params: [5] });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "aaaaa", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({ value: item.value, property: item.property, rule: "maxLength", error: error, params: [5] });
    });
  });

  it("Should combine two or more validation rules and throw errors", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().string();
    }).toThrow(`The field is required`);

    validator = ValidatorRules.values(5, "field");

    expect(() => {
      validator.required().string();
    }).toThrow("The field must be a string");

    validator = ValidatorRules.values("aaaaaa", "field");

    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow("The field must be less or equal than 5 characters");

    validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().boolean();
    }).toThrow(`The field is required`);

    validator = ValidatorRules.values("aaaaaa", "field");
    expect(() => {
      validator.required().boolean();
    }).toThrow(`The field must be a boolean`);
  });
});
