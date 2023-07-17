import { Category } from "../../../category/domain/entitites/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { inMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository";
import { SortDirection } from "../../../shared/domain/repository/repository-contracts";

export class CategoryInMemoryRepository
    extends inMemorySearchableRepository<Category>
    implements CategoryRepository.Repository
{
    sortableFields: string[] = ["name", "created_at"];

    protected async applyFilter(
        items: Category[],
        filter: CategoryRepository.Filter,
    ): Promise<Category[]> {
        if (!filter) {
            return items;
        }

        return items.filter((i) => {
            return i.props.name.toLowerCase().includes(filter.toLowerCase());
        });
    }

    protected async applySort(
        items: Category[],
        sort: string,
        sort_dir: SortDirection,
    ): Promise<Category[]> {
        if (!sort) {
            return super.applySort(items, "created_at", "desc");
        } else {
            return super.applySort(items, sort, sort_dir);
        }
    }
}
