import express from 'express';
import cors from 'cors';
import 'express-async-errors';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'] }));
  }

  private routes() {
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Server listen in port: ${PORT}`));
  }
}

export { App };

export const { app } = new App();
