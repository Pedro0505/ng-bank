import HttpErrors from './class/HttpErrors';

export class BadRequest extends HttpErrors {
  protected _code: number;
  protected _message: { error: string; };

  constructor(message: string) {
    super(400, message);
    this._code = 400;
    this._message = {
      error: message,
    };
  }

  get reponse() {
    return {
      code: this._code,
      error: {
        message: this._message.error,
      },
    };
  }
}

export default BadRequest;
