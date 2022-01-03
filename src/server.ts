import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import * as http from 'http';
import cors from 'cors';

export class App {
  private port: string;
  private express: express.Express;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();

    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(compress());
    this.express.use(cors());

    this.express.get('/', (_req: Request, res: Response) => {
      res.send({ message: `Serverless express running!` });
    });
  }

  getExpress() {
    return this.express;
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `App is running at http://localhost:${
            this.port
          } in ${this.express.get('env')} mode`
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
