import { MaxLength, IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { Category } from "./category.entity";
// import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";
import { Notification } from "../../shared/domain/validators/notification";

//criar um testes que verifique os decorators
export class CategoryRules {
  @MaxLength(255, { groups: ["name"] })
  name: string;

  constructor(entity: Category) {
    Object.assign(this, entity);
  }
}

export class CategoryValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ["name"];
    return super.validate(notification, new CategoryRules(data), newFields);
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

//*** Oldversion - left here for comparison with notification pattern */
//criar um testes que verifique os decorators
// export class CategoryRules {
//   @MaxLength(255)
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsOptional()
//   description: string | null;

//   @IsBoolean()
//   @IsNotEmpty()
//   is_active: boolean;

//   constructor({ name, description, is_active }: Category) {
//     Object.assign(this, { name, description, is_active });
//   }
// }

// //** Change this if need .  ex:  Classvalidatior fields to Joivaldiator fields */
// // export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
// //   validate(entity: Category) {
// //     return super.validate(new CategoryRules(entity));
// //   }
// // }

// export class CategoryValidatorFactory {
//   static create() {
//     return new CategoryValidator();
//   }
// }
