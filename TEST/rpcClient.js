const thrift = require('thrift');
const CompileMethod = require("../src/thrift/compile/gen-nodejs/Compile");

function createConnection() {
  const transport = thrift.TBufferedTransport;
  const protocol = thrift.TBinaryProtocol;

  const connect = thrift.createConnection("localhost", 9999, {
    transport,
    protocol,
  })

  connect.on('error', function (err) {
    console.error('报错了', err);
  })

  return connect;
}

const connect = createConnection();

// 创建thrift服务
const client = thrift.createClient(CompileMethod, connect);

client.Run('<div prop1="aaa"></div>', (error, response) => {
  console.info(error, JSON.stringify(response));
})