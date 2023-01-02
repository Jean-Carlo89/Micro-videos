import { Category } from "./Category";

describe("Category tests", () => {
  test("constructor of category", () => {
    const category = new Category("Movie");

    expect(category.name).toStrictEqual("Movie");
  });
});
