import UniqueEntityId from "../../../seedwork/domain/value-objects/unique-entity-id.vo";
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
      expect(category.uniqueEntityId).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
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

  it("should update name and description", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };

    const props: CategoryProps = {
      name: "Dança",
      description: "dance description",
    };
    const category = new Category(props);
    expect(category.props.name).toStrictEqual("Dança");
    expect(category.props.description).toStrictEqual("dance description");

    const update = {
      name: "Dança de salão",
      description: "Dança de salaão description",
    };
    category.update(update.name, update.description);

    expect(category.props.name).toStrictEqual(update.name);
    expect(category.props.description).toStrictEqual(update.description);
  });

  test("Activate", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };

    const props: CategoryProps = {
      name: "Dança",
      description: "dance description",
    };
    const category = new Category(props);
    expect(category.props.is_active).toBe(false);

    category.activate();

    expect(category.props.is_active).toBe(true);
  });

  test("deactivate", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };

    const props: CategoryProps = {
      name: "Dança",
      description: "dance description",
      is_active: true,
    };
    const category = new Category(props);
    expect(category.props.is_active).toBe(true);

    category.deactivate();

    expect(category.props.is_active).toBe(false);
  });
});
