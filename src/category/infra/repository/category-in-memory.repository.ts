import { CategoryRepository } from "category/domain/repository/category.repository";
import { Category } from "category/domain/entitites/category";

import { inMemoryRepository, inMemorySearchableRepository } from "shared/domain/repository/in-memory.repository";

class CategoryInMemoryRepository extends inMemorySearchableRepository<Category> implements CategoryRepository {}
