"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = __importDefault(require("../../../seedwork/domain/unique-entity-id.vo"));
const Category_1 = require("./Category");
describe("Category tests", () => {
    test("constructor of category", () => {
        const props = {
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at: new Date(),
            prop1: "some props",
        };
        const category = new Category_1.Category(props);
        //* !1 versão
        // expect(category.name).toStrictEqual("Movie");
        // expect(category.description).toStrictEqual(props.description);
        // expect(category.is_active).toBeTruthy();
        // expect(category.created_at).toBe(props.created_at);
        //** Comparando objetos */
        expect(category.props).toStrictEqual(props);
    });
    test("getter of name field", () => {
        const category = new Category_1.Category({ name: "Movie" });
        expect(category.name).toBe("Movie");
    });
    test("getter and setter of description field", () => {
        const category = new Category_1.Category({ name: "Movie", description: "some description" });
        expect(category.description).toBe("some description");
        category["description"] = "other description";
        expect(category.description).toBe("other description");
        category["description"] = undefined;
        expect(category.description).toBeNull();
    });
    test("id field", () => {
        const data = [{ props: { name: "Movie" } }, { props: { name: "Movie" }, id: null }, { props: { name: "Movie" }, id: undefined }, { props: { name: "Movie" }, id: new unique_entity_id_vo_1.default() }];
        data.forEach((i) => {
            const category = new Category_1.Category(i.props, i.id);
            expect(category.id).not.toBeNull();
            expect(category.id).toBeInstanceOf(unique_entity_id_vo_1.default);
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
