import { NextFunction, Request, Response } from 'express';
import ValidatorMiddleware from '../../class/ValidatorMiddleware';
import UsersSchemas from './UsersSchemas';

class UsersMiddleware extends ValidatorMiddleware {
  private _schema: UsersSchemas;

  constructor(schema: UsersSchemas) {
    super();
    this._schema = schema;
  }

  public loginValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this._schema.login().validate(req.body);

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ error: { message } });
    }

    next();
  };

  public registerValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this._schema.register().validate(req.body);

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ error: { message } });
    }

    next();
  };
}

export default UsersMiddleware;
