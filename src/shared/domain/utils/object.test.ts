import { ValueObject } from "../value-objects/value-object";
import { deepFreeze } from "./object";
class StubValueObject extends ValueObject {}
describe("object uni tests", () => {
  it("should not freeze a scalar value ", () => {
    const str = deepFreeze("a");

    expect(typeof str).toBe("string");

    let boolean = deepFreeze(true);

    expect(typeof boolean).toBe("boolean");

    boolean = deepFreeze(false);

    expect(typeof boolean).toBe("boolean");

    const number = deepFreeze(5);
    expect(typeof number).toBe("number");
  });

  it("should be a immutable object", () => {
    const date = new Date();
    const obj = deepFreeze({ prop1: "value1", deep: { prop2: "value2", prop3: date } });

    expect(() => ((obj as any).prop1 = "mudou")).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
    //  expect(typeof obj).toBe("string");

    expect(() => ((obj as any).deep.prop2 = "aaaa")).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });

  it("should be a immutable object - 2", () => {
    const date = new Date();
    const obj = deepFreeze({ prop1: "value1", deep: { prop2: "value2", prop3: date } });

    const vo = new StubValueObject(obj);

    expect(() => ((vo as any).value.prop1 = "mudou")).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
    //  expect(typeof obj).toBe("string");

    expect(() => ((vo as any).value.deep.prop2 = "aaaa")).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });

  //   it("immutable", () => {
  //     const vo = new StubValueObject({ prop1: "value", nested: { prop2: new Date() } });

  //     vo["_value"].nested.prop2 = "mudou";

  //     console.log(vo);
  //   });
});
