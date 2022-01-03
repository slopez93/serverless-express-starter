import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import Router from 'express-promise-router';
import compress from 'compression';
import * as http from 'http';
import cors from 'cors';

import { registerRoutes } from './routes';
import httpStatus from 'http-status';

export class App {
  private port: string;
  private app: express.Express;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.app = express();

    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(compress());
    this.app.use(cors());
    const router = Router();

    this.app.use(router);

    registerRoutes(router);

    router.use((err: Error, _req: Request, res: Response) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  getExpress() {
    return this.app;
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(
          `App is running at http://localhost:${this.port} in ${this.app.get(
            'env'
          )} mode`
        );
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
