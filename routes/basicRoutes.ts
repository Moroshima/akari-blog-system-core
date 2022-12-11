import { Context } from "koa";
import Router from "koa-router";

const basicRouter = new Router();

basicRouter.get("/", (ctx: Context) => {
  ctx.response.body = "Hello World!";
  ctx.response.status = 200;
});

export default basicRouter;
