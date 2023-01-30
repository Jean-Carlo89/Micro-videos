import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {}

describe("Value Object Unit tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");

    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "Value1" });
    expect(vo.value).toStrictEqual({ prop1: "Value1" });
  });

  it("should convert to String", () => {
    const date = new Date();
    let arrange = [
      //{ received: null, expected: "null" },
      //  { received: undefined, expected: "undefined" },
      { received: "fake test", expected: "fake test" },
      { received: "", expected: "" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
    ];

    arrange.forEach((item) => {
      let vo = new StubValueObject(item.received);
      // console.log(vo);
      expect(vo + "").toBe(item.expected);
    });
  });

  it("should be an immutable object ", () => {
    let obj = { prop1: "value1", deep: { prop2: "value2", prop3: new Date() } };

    const vo = new StubValueObject(obj);
    //  obj.prop1 = "aaaaa";
    expect(() => {
      (vo as any).value.prop1 = "test";
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => {
      (vo as any).value.deep.prop2 = "test";
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
