export function deepFreeze<T>(obj: T) {
  const propNames = Object.getOwnPropertyNames(obj);
  // console.log(propNames);
  for (const name of propNames) {
    const value = obj[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
