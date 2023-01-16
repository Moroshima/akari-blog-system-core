import basicRouter from "@routes/basicRoutes";
import publicRouter from "@routes/publicRoutes";
import Router from "koa-router";
import Application from "koa";
import adminRouter from "./adminRoutes";

const router = new Router();

router.prefix("/api");
router
  .use("/", basicRouter.routes(), basicRouter.allowedMethods())
  .use("/blog", publicRouter.routes(), publicRouter.allowedMethods())
  .use("/admin", adminRouter.routes(), adminRouter.allowedMethods());

export default function (app: Application) {
  app.use(router.routes()).use(router.allowedMethods());
}
