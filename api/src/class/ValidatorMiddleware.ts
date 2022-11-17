abstract class ValidatorMiddleware {
  protected handleError(error: string[]): { code: number, message: string } {
    const [code, message] = error;
    const codeNum = +code;
    const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
    const validMessage = Number.isNaN(codeNum) ? code : message;
    return { code: validCode, message: validMessage };
  }
}

export default ValidatorMiddleware;
