import jwt, { SignOptions } from 'jsonwebtoken';
import { IPayloadJwt } from '../typescript/interfaces/IPayloadJwt';
import 'dotenv/config';

class Jwt {
  private static jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
  private static JWT_SECRET = process.env.JWT_SECRET as string;

  public generate(playload: IPayloadJwt) {
    return jwt.sign({ tokenData: playload }, Jwt.JWT_SECRET, Jwt.jwtConfig);
  }
}

export default Jwt;
