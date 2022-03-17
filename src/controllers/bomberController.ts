import BomberService from "../services/bomberService";
import {Context} from "koa";

class BomberController {
  async startUp(ctx: Context) {
    const { phone } = ctx.request.body;
    BomberService.startUp(phone);
    ctx.body = {
      message: "success"
    }
  }
}

export default new BomberController();
