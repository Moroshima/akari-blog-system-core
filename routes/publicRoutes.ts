import { Context } from "koa";
import Router from "koa-router";

const publicRouter = new Router();

publicRouter.get("/article", (ctx: Context) => {
  ctx.response.body = "blog www";
  ctx.response.status = 201;
});

export default publicRouter;
