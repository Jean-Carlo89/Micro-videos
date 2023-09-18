// import { Uuid } from '../../../shared/domain/value-object/uuid.vo';
// import { InMemoryRepository, InMemorySearchableRepository } from "../../../shared/infra/db/in-memory/in-memory.repository";
// import { Category } from "../../domain/category.entity";

// // export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid> {
// //   getEntity(): new (...args: any[]) => Category {
// //     return Category;
// //   }
// // }

// export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> {
//   protected applyFilter(items: Category[], filter: string): Promise<Category[]> {
//     throw new Error("Method not implemented.");
//   }
//   getEntity(): new (...args: any[]) => Category {
//     return Category;
//   }
// }

import { SortDirection } from "../../../shared/domain/repository/search-params";
import { Uuid } from "../../../shared/domain/value-object/uuid.vo";
import { InMemorySearchableRepository } from "../../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../domain/category.entity";
import { CategoryFilter, ICategoryRepository } from "../../domain/category.repository";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> implements ICategoryRepository {
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(items: Category[], filter: CategoryFilter): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  protected applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null) {
    return sort ? super.applySort(items, sort, sort_dir) : super.applySort(items, "created_at", "desc");
  }
}
