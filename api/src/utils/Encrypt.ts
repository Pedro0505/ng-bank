import { compare, genSalt, hash } from 'bcrypt';

class Encrypt {
  public async bcryptVerify(password: string, passwordDB: string) {
    const verify = await compare(password, passwordDB);

    return verify;
  }

  public async bcryptEncrypt(password: string) {
    const salt = await genSalt(10);

    const hashed = await hash(password, salt);

    return hashed;
  }
}

export default Encrypt;
