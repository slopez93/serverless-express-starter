import { APIGatewayProxyHandler } from "aws-lambda";
import * as awsServerlessExpress from "aws-serverless-express";
import { Server } from "http";
import { App } from "./server";

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const port = "3000";
  const app = new App(port);
  return awsServerlessExpress.createServer(app.getExpress());
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, "PROMISE")
    .promise;
};
