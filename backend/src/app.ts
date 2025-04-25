import express from 'express';

import cors from 'cors';
import routes from './routes';

export class NawyApp {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
  }

  public async listen() {
    const server = this.app.listen(process.env.API_PORT, () => {
      console.log(`App listening on port ${process.env.API_PORT}`);
    });

    server.on('error', (error) => {
      console.error('App error', error);
    });
  }

  private initializeMiddlewares() {
    const options = {
      origin: [
        'http://localhost:3000',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    };

    this.app.use(express.json());
    this.app.use(cors(options));
    this.app.use('/api/v1', routes);
  }
}
