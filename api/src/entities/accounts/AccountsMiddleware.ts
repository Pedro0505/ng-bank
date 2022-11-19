import { NextFunction, Request, Response } from 'express';
import ValidatorMiddleware from '../../class/ValidatorMiddleware';
import AccountsSchema from './AccountsSchema';

class AccountsMiddleware extends ValidatorMiddleware {
  private _schema: AccountsSchema;

  constructor(schema: AccountsSchema) {
    super();
    this._schema = schema;
  }

  public cashOut = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this._schema.cashOut().validate(req.body);
    const { username } = req.tokenData;
    const regValue = /^(\d*)[.](\d{2}|\d{1})$/g;

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ error: { message } });
    }

    if (req.body.value === 0) {
      return res.status(400).json({ error: { message: 'The transfer value cannot be zero' } });
    }

    if (username === req.body.creditedUsername) {
      return res.status(400).json({ error: { message: 'You cannot transfer to your own account' } });
    }

    const { value }: { creditedUsername: string, value: number } = req.body;

    if (value.toString().includes('.')) {
      if (!(regValue.test(req.body.value))) {
        return res.status(400).json({ error: { message: '"value" must have one or two decimal places' } });
      }
    }

    next();
  };
}

export default AccountsMiddleware;
