// 创建WebSocket连接
const socket = new WebSocket('ws://127.0.0.1:8080');

// 处理连接打开时的事件
socket.addEventListener('open', (event) => {
    console.log('WebSocket连接已打开');
});

// 处理消息接收时的事件
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'room_created') {
        // 服务器返回房间已创建的消息，处理房间ID
        const roomId = message.roomId;
        console.log(`房间已创建，房间ID: ${roomId}`);
    } else if (message.type === 'joined_room') {
        // 服务器返回成功加入房间的消息，处理房间ID
        const roomId = message.roomId;
        console.log(`成功加入房间，房间ID: ${roomId}`);
    } else if (message.type === 'join_failed') {
        // 服务器返回加入房间失败的消息
        console.log('加入房间失败');
    } else if (message.type === 'player_joined') {
        // 有新玩家加入房间的消息
        console.log('有新玩家加入房间');
    } else if (message.type === 'player_left') {
        // 有玩家离开房间的消息
        console.log('有玩家离开房间');
    }
    // 处理其他消息...
});

// 创建房间请求
function createRoom() {
    const message = { type: 'create_room' };
    socket.send(JSON.stringify(message));
}

// 加入房间请求
function joinRoom(roomId) {
    const message = { type: 'join_room', roomId: roomId };
    socket.send(JSON.stringify(message));
}

// 示例：创建房间
createRoom();

// 示例：加入房间
joinRoom(123); // 传递要加入的房间ID
