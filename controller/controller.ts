import { basic } from "./basic.controller";
import { blog } from "./blog.controller";
import Router from "koa-router";
import Application from "koa";

const router = new Router();

router.prefix("/api");
router
  .use("/", basic.routes(), basic.allowedMethods())
  .use("/blog", blog.routes(), blog.allowedMethods());

export default function (app: Application) {
  app.use(router.routes()).use(router.allowedMethods());
}
