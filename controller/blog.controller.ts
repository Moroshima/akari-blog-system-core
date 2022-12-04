import { Context } from "koa";
import Router from "koa-router";

const blog = new Router();

blog.get("/article", (ctx: Context) => {
  ctx.response.body = "blog www";
  ctx.response.status = 201;
});

export { blog };
