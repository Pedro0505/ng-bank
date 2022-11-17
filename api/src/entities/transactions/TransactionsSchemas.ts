import joi from 'joi';

class TransactionsSchemas {
  private joi: joi.Root;

  constructor(validator: joi.Root) {
    this.joi = validator;
  }

  public filters() {
    return this.joi.object<{ date: string, type: string }>({
      date: this.joi.string().regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).messages({
        'string.pattern.base': '400|"date" is invalid date format must be yyyy-mm-dd',
        'string.base': '400|"date" must be a string',
      }),
      type: this.joi.string().regex(/cashOut|cashIn/i).messages({
        'string.pattern.base': '400|"type" must be "cashIn" or "cashOut"',
        'string.base': '400|"type" must be a string',
      }),
    });
  }
}

export default TransactionsSchemas;
