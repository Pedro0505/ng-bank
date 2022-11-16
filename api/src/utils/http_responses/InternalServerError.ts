import HttpErrors from './class/HttpErrors';

class InternalServerError extends HttpErrors {
  protected _code: number;
  protected _message: { error: string; };

  constructor(message: string) {
    super(500, message);
    this._code = 500;
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

export default InternalServerError;
