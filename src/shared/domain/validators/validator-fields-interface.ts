export type FieldErrors = {
  [filed: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated> {
  validate(data: any): void;
  errors: FieldErrors;
  validatedData: PropsValidated;
}
