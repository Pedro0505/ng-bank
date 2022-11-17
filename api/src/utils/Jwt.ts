import jwt, { SignOptions } from 'jsonwebtoken';
import { IPayloadJwt } from '../typescript/interfaces/IPayloadJwt';
import 'dotenv/config';
import { IDecoded } from '../typescript/interfaces/IDecode';

class Jwt {
  private static jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
  private static JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

  public static generate(playload: IPayloadJwt) {
    return jwt.sign({ tokenData: playload }, Jwt.JWT_SECRET, Jwt.jwtConfig);
  }

  public static verify(authorization: string) {
    return jwt.verify(authorization, Jwt.JWT_SECRET) as IDecoded;
  }
}

export default Jwt;
