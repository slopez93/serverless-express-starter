import { Request, Response, Router } from 'express';

export const register = (router: Router) => {
  router.get('/', (_req: Request, res: Response) => {
    res.send({ message: `Serverless express running!` });
  });
};
