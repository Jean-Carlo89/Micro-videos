import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Entity } from "../../shared/domain/entity";
import { ValueObject } from "../../shared/domain/value-object";

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};
export class Category extends Entity {
  get entity_id(): ValueObject {
    return this.category_id;
  }
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: CategoryConstructorProps) {
    const category = new Category(props);

    this.validate(category);

    return category;
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.is_active = true;
  }

  update(name: string, description: string) {
    this.changeName(name);
    this.changeDescription(description);
  }

  deactivate() {
    this.is_active = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();

    const isValid = validator.validate(entity);

    //console.log(validator.errors);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
