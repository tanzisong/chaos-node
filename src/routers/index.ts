import Router from "@koa/router";
import bomberController from "../controllers/bomberController";
import Compile from "../controllers/Compile";

const router = new Router({
  prefix: '/restful/'
});

// 组装路由
router.post("/sms", bomberController.startUp);
router.post("/compile", Compile.run);

export default router.routes();