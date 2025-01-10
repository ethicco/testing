import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

const logger = new Logger("main.ts");

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const httpPort = 3002;

  logger.log(`HTTP server is running on: ${httpPort} port`);

  return app.listen(httpPort);
};

export default bootstrap();
