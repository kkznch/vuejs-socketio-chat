// パッケージ読み込み
var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

// サーバを起動する
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end('Server started\n');
}).listen(3000);

// Listen状態にする
var io = socketio.listen(server);

// クライアント接続時のイベント
io.sockets.on("connection", function (socket) {

    // クライアントからメッセージ受信時のイベント
    socket.on("C_to_S_message", function (data) {
        // 他のクライアントにメッセージを送信する
        socket.broadcast.emit("S_to_C_message", {value:data.value});
    });

});