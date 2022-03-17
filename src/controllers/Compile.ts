import {Context} from "koa";

class CompileController {
  async run(ctx: Context) {
    ctx.body = {
      message: "success"
    }
  }
}

export default new CompileController();
