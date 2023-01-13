import UniqueEntityId from "../../../seedwork/domain/unique-entity-id.vo";
import { Category, CategoryProps } from "./Category";

describe("Category tests", () => {
  test("constructor of category", () => {
    const props = {
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
      prop1: "some props",
    };
       const category = new Category(props);

    //* !1 versão
    // expect(category.name).toStrictEqual("Movie");
    // expect(category.description).toStrictEqual(props.description);
    // expect(category.is_active).toBeTruthy();
    // expect(category.created_at).toBe(props.created_at);

    //** Comparando objetos */
    expect(category.props).toStrictEqual(props);
  });

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description field", () => {
    const category = new Category({ name: "Movie", description: "some description" });
    expect(category.description).toBe("some description");

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };
    const data: CategoryData[] = [{ props: { name: "Movie" } }, { props: { name: "Movie" }, id: null }, { props: { name: "Movie" }, id: undefined }, { props: { name: "Movie" }, id: new UniqueEntityId() }];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

    //   let category = new Category({ name: "Movie" });
    //   expect(category.id).not.toBeNull();
    //   expect(uuidValidate(category.id)).toBeTruthy();

    //   category = new Category({ name: "Movie" }, null);
    //   expect(category.id).not.toBeNull();
    //   expect(uuidValidate(category.id)).toBeTruthy();

    //   category = new Category({ name: "Movie" }, null);
    //   expect(category.id).not.toBeNull();
    //   expect(uuidValidate(category.id)).toBeTruthy();
  });
});
