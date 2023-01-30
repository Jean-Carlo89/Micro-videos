import { deepFreeze } from "../utils/object";

describe("Object unit tests", () => {
  it("should not be a scalar value ", () => {
    let str = deepFreeze("a");

    expect(typeof str).toBe("string");

    let boolean = deepFreeze(true);

    expect(typeof boolean).toBe("boolean");

    boolean = deepFreeze(false);

    expect(typeof boolean).toBe("boolean");

    let number = deepFreeze(5);

    expect(typeof number).toBe("number");
  });
  it("should be an immutable object ", () => {
    let obj = deepFreeze({ prop1: "value1", deep: { prop2: "value2", prop3: new Date() } });

    //  obj.prop1 = "aaaaa";
    expect(() => {
      (obj as any).prop1 = "aaaa";
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => {
      (obj as any).deep.prop2 = "aaaa";
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
