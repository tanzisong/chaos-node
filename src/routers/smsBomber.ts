/**
 * 短信轰炸机路由文件
 * */
import Router from "@koa/router";
import bomberController from "../controllers/bomberController.js";

const router = new Router({
  prefix: '/api/smsBomber'
});

// 组装路由
router.post("/", bomberController.startUp);

export default router.routes();