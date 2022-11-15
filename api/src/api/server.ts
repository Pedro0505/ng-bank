import { App } from './App';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

new App().start(PORT);
