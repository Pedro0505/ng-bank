import { NextFunction, Request, Response } from 'express';
import ValidatorMiddleware from '../../class/ValidatorMiddleware';
import TransactionsSchemas from './TransactionsSchemas';

class TransactionsMiddleware extends ValidatorMiddleware {
  private _schema: TransactionsSchemas;

  constructor(schema: TransactionsSchemas) {
    super();
    this._schema = schema;
  }

  public validateFilters = (req: Request, res: Response, next: NextFunction) => {
    const { date, type } = req.query as { date: string, type: string };
    const { error } = this._schema.filters().validate({ date, type });

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ error: { message } });
    }

    next();
  };
}

export default TransactionsMiddleware;
