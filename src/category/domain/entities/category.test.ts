import { UniqueEntityId } from "#shared/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";

// import { UniqueEntityId } from "../../../shared/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
// @core/shared/

describe("Category unit tests", () => {
    //   test("constructor of category", () => {
    //     const category = new Category("movie");

    //     expect(category.name).toBe("movie");
    //   });

    beforeEach(() => {
        Category.validate = jest.fn(() => {
            // console.log("validate faked");
        });
    });
    test("constructor of category", () => {
        const date = new Date();
        const props: CategoryProperties = {
            name: "movie",
            description: "some desc",
            is_active: true,
            created_at: date,
        };
        const category = new Category(props);

        expect(Category.validate).toHaveBeenCalled();

        expect(category.name).toBe("movie");

        expect(category.description).toBe("some desc");

        expect(category.is_active).toBeTruthy();

        expect(category.created_at).toBe(date);
    });

    test("constructor of category- second method", () => {
        const date = new Date();
        const props: CategoryProperties = {
            name: "movie",
            description: "some desc",
            is_active: true,
            created_at: date,
        };
        const category = new Category(props);
        expect(Category.validate).toHaveBeenCalled();
        expect(category.props).toStrictEqual({
            name: "movie",
            description: "some desc",
            is_active: true,
            created_at: date,
        });
    });

    test("constructor of category- third method", () => {
        let category = new Category({ name: "Movie" });

        let props = omit(category.props, "created_at");
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });

        expect(category.props.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: "Movie",
            description: "some desc",
            is_active: false,
            created_at,
        });

        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "some desc",
            is_active: false,
            created_at,
        });

        category = new Category({ name: "Movie", description: "other desc" });

        expect(category.props).toMatchObject({
            name: "Movie",
            description: "other desc",
        });

        category = new Category({ name: "Movie", is_active: true });

        expect(category.props).toMatchObject({
            name: "Movie",
            is_active: true,
        });
    });

    test("getter of name field", () => {
        const category = new Category({ name: "Movie" });

        expect(category.name).toBe("Movie");
    });

    test("getter and setter of name field", () => {
        const category = new Category({ name: "Movie" });

        expect(category.name).toBe("Movie");

        category["name"] = "other";
        expect(category.name).toStrictEqual("other");
    });

    test("getter and setter of description field", () => {
        let category = new Category({ name: "Movie", description: "desc" });

        expect(category.description).toBe("desc");

        category = new Category({ name: "Movie" });

        expect(category.description).toBe(null);

        category = new Category({ name: "Movie" });

        category["description"] = "changed desc";

        expect(category.description).toBe("changed desc");

        category["description"] = undefined as any;

        expect(category.description).toBe(null);
    });

    test("getter and setter of  is_active field", () => {
        let category = new Category({ name: "Movie", is_active: true });

        expect(category.is_active).toBeTruthy();

        category = new Category({ name: "Movie" });

        expect(category.is_active).toBeTruthy();

        category = new Category({ name: "Movie", is_active: false });

        expect(category.is_active).toBeFalsy();
    });

    test("getter  of  created_ field", () => {
        let category = new Category({ name: "Movie", is_active: true });

        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({ name: "Movie", created_at });

        expect(category.created_at).toBe(created_at);

        //  category = new Category({ name: "Movie", created_at: false });

        // expect(category.created_at).toBeFalsy();
    });

    test(" id field", () => {
        // let category = new Category({ name: "Movie" });

        // expect(category.id).not.toBeNull();

        // expect(uuidValidate(category.id)).toBeTruthy();

        // category = new Category({ name: "Movie" }, null);

        // expect(category.id).not.toBeNull();

        // expect(uuidValidate(category.id)).toBeTruthy();

        // category = new Category({ name: "Movie" }, undefined);

        // expect(category.id).not.toBeNull();

        // expect(uuidValidate(category.id)).toBeTruthy();

        type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
        const data: CategoryData[] = [
            {
                props: { name: "Movie" },
            },
            {
                props: { name: "Movie" },
                id: null,
            },
            {
                props: { name: "Movie" },
                id: undefined,
            },
            // {
            //   props: { name: "Movie" },
            //   id: "b9b11bb6-e9f1-4efa-b31b-ee0f8785f755",
            // },

            {
                props: { name: "Movie" },
                id: new UniqueEntityId(),
            },
        ];

        data.forEach((i) => {
            let category = new Category(i.props, i.id);
            expect(category.id).not.toBeNull();

            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

            // expect(uuidValidate(category.id)).toBeTruthy();
        });
    });

    it("should update", () => {
        let category = new Category({
            name: "Movie",
            is_active: true,
            description: "first",
        });

        expect(category.created_at).toBeInstanceOf(Date);

        category.update("new name", "new desc");

        expect(Category.validate).toHaveBeenCalledTimes(2);

        expect(category.name).toStrictEqual("new name");
        expect(category.description).toStrictEqual("new desc");
    });

    it("should activate a category", () => {
        let category = new Category({
            name: "Movie",
            is_active: false,
            description: "first",
        });

        expect(category.is_active).toStrictEqual(false);

        category.activate();

        expect(category.is_active).toStrictEqual(true);
    });

    it("should deactivate a category", () => {
        let category = new Category({
            name: "Movie",
            is_active: true,
            description: "first",
        });

        expect(category.is_active).toStrictEqual(true);

        category.deactivate();

        expect(category.is_active).toStrictEqual(false);
    });
});
