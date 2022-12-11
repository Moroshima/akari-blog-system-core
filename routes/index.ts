import basicRouter from "./basicRoutes";
import publicRouter from "./publicRoutes";
import Router from "koa-router";
import Application from "koa";

const router = new Router();

router.prefix("/api");
router
  .use("/", basicRouter.routes(), basicRouter.allowedMethods())
  .use("/blog", publicRouter.routes(), publicRouter.allowedMethods());

export default function (app: Application) {
  app.use(router.routes()).use(router.allowedMethods());
}
