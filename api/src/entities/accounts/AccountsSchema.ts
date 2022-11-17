import joi from 'joi';
import ValidatorMiddleware from '../../class/ValidatorMiddleware';

class AccountsSchema extends ValidatorMiddleware {
  private joi: joi.Root;

  constructor(validator: joi.Root) {
    super();
    this.joi = validator;
  }

  public cashOut() {
    return this.joi.object<{ creditedUsername: string, value: number }>({
      creditedUsername: this.joi.string().required().min(3).messages({
        'any.required': '400|"creditedUsername" is required',
        'string.min': '400|"creditedUsername" it has to be greater than 2',
      }),
      value: this.joi.number().strict().required().messages({
        'any.required': '400|"value" is required',
        'number.base': '400|"value" must be a number',
      }),
    });
  }
}

export default AccountsSchema;
