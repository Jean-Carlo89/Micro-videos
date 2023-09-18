import { IRepository } from "../../shared/domain/repository/repository-interface";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { Category } from "./category.entity";

export interface ICategoryRepository extends IRepository<Category, Uuid> {}