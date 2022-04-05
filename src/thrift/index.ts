import Thrift from "thrift";

import Compile from '../services/Compile';

const MainMethods = require("./compile/gen-nodejs/Compile");
const Types = require("./compile/gen-nodejs/compile_types");

const { Data, Code } = Types;

const Server = Thrift.createServer(MainMethods, {
  Run: (xml: string, result: (error: any, response: any) => void) => {
    console.info("Server compile run");
  
    const compileResult = Compile.Run(xml);
    
    const res = new Data({
      code: Code.success,
      data: {
        jsonStr: JSON.stringify(compileResult)
      }
    });
    
    result(null, res);
  }
});

Server.listen(9999);
