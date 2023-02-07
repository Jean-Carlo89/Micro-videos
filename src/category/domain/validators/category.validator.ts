import { Category, CategoryProps } from "../entities/Category";

import { IsDate, IsNotEmpty, IsOptional, MaxLength, IsString, IsBoolean } from "class-validator";
import { ClassValidatorfields } from "../../../seedwork/domain/validators/class-validator-field";
export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor(data: CategoryProps) {
    Object.assign(this, data);
  }
}
export class CategoryValidator extends ClassValidatorfields<CategoryRules> {
  errors: any;

  validate(data: CategoryProps): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
