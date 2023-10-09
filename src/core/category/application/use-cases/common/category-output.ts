import { Category } from "../../../domain/category.entity";

export type CategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  created_at: Date;
  is_active: boolean;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    const { category_id, ...otherProps } = entity.toJSON();
    return {
      id: entity.category_id.id,
      ...otherProps,
    };
  }
}
