"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("./Category");
describe("Category tests", () => {
    test("constructor of category", () => {
        const category = new Category_1.Category("Movie");
        expect(category.name).toStrictEqual("Movie");
    });
});
