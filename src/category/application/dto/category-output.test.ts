import { Category } from "../../../category/domain/entitites/category";
import { Output } from "./../use-cases/create-category.use-case";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper", () => {
    it("should convert a category in output", () => {
        const created_at = new Date();
        const entity = new Category({
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at,
        });

        const spyToJSON = jest.spyOn(entity, "toJSON");

        const output = CategoryOutputMapper.toOutput(entity);

        expect(spyToJSON).toBeCalledTimes(1);

        expect(output).toStrictEqual({
            id: entity.id,
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at,
        });
    });
});
