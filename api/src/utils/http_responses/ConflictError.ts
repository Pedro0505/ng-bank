import ResponseError from './class/BadRequest';

export class ConflictError extends ResponseError {
  protected _code: number;
  protected _message: { error: string; };

  constructor(message: string) {
    super(409, message);
    this._code = 409;
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

export default ConflictError;
