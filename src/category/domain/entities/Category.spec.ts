import { Category } from "./Category";

describe("Category tests", () => {
  test("constructor of category", () => {
    const category = new Category("Movie","",false,"" as any);

    expect(category.name).toStrictEqual("Movie");
  });
});
