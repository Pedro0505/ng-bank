import ResponseError from './class/BadRequest';

class NotFoundError extends ResponseError {
  protected _code: number;
  protected _message: { error: string; };

  constructor(message: string) {
    super(404, message);
    this._code = 404;
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

export default NotFoundError;
