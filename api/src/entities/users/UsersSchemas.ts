import joi from 'joi';
import { IUsers } from './interfaces/IUsers';

class UsersSchema {
  private joi: joi.Root;

  constructor(validator: joi.Root) {
    this.joi = validator;
  }

  public login() {
    return this.joi.object<IUsers>({
      username: this.joi.string().required().min(3).messages({
        'any.required': '400|"Username" is required',
        'string.min': '400|"Username" it has to be greater than 2',
      }),
      password: this.joi.string().required().min(8).regex(/[A-Z]/)
        .regex(/\d/)
        .messages({
          'any.required': '400|"Password" is required',
          'string.min': '400|"Password" it has to be greater than 7',
          'string.pattern.base': '400|"Password" it\'s must have at least one capital letter and one number',
        }),
    });
  }

  public register() {
    return this.joi.object<IUsers>({
      username: this.joi.string().required().min(3).messages({
        'any.required': '400|"Username" is required',
        'string.min': '400|"Username" it has to be greater than 2',
      }),
      password: this.joi.string().required().min(8).regex(/[A-Z]/)
        .regex(/\d/)
        .messages({
          'any.required': '400|"Password" is required',
          'string.min': '400|"Password" it has to be greater than 7',
          'string.pattern.base': '400|"Password" it\'s must have at least one capital letter and one number',
        }),
    });
  }
}

export default UsersSchema;
