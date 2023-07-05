import { Category } from "../entitites/category";
import { SearchableRepositoryInterface } from "../../../shared/domain/repository/repository-contracts";
export interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any> {}
