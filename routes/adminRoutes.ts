import adminController from "@controllers/adminController";
import Router from "koa-router";

const adminRouter = new Router();

adminRouter.post("/login", adminController.login);

export default adminRouter;
