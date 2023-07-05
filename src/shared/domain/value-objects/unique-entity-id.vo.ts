import { InvalidUuidError } from "../../domain/errors/invalid-uuid.error";
import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidV4());

    this.validate();
  }

  private validate() {
    const is_valid = uuidValidate(this.value);

    if (!is_valid) {
      throw new InvalidUuidError();
    }
  }
}
