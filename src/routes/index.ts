import { Router } from 'express';
import { glob } from 'glob';

export const registerRoutes = (router: Router) => {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.forEach((path) => loadRoute(path, router));
};

function loadRoute(path: string, router: Router) {
  const route = require(path);
  route.register(router);
}
