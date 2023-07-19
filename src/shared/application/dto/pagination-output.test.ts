import { SearchResult } from "../../../shared/domain/repository/repository-contracts";
import { PaginationOutputMapper } from "./pagination-output";

describe("CategoryOutputMapper Unit tests", () => {
    it("should convert a search result in output", () => {
        const result = new SearchResult({
            items: ["fake"] as any,
            total: 1,
            current_page: 1,
            per_page: 1,
            sort: "name",
            sort_dir: "desc",
            filter: "fake",
        });

        //const spyToJSON = jest.spyOn(entity, "toJSON");

        const output = PaginationOutputMapper.toOutput(result);

        // expect(spyToJSON).toBeCalledTimes(1);

        expect(output).toStrictEqual({
            total: 1,
            current_page: 1,
            per_page: 1,
            last_page: 1,
        });
    });
});