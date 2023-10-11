const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  // 处理HTTP请求
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('新连接已建立');

  ws.on('message', (message) => {
    // 处理从客户端收到的消息
    console.log(`收到消息: ${message}`);

    // 广播消息给所有连接的客户端 同步操作
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('连接已关闭');
  });
});

server.listen(8080, () => {
  console.log('WebSocket服务器已启动在端口 8080');
});
