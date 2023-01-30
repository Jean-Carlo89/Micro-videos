import { v4 as uuid, validate as uuidValidate } from "uuid";
import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { ValueObject } from "./value-object";
export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuid());

    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this._value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
