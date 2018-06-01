(function() {
    'use strict';

    const url = 'http://localhost:3000';
    var socket = io.connect(url);

    // サーバ接続時のイベント
    socket.on("connect", function () {
        console.log("Connected " + url);
    });

    // サーバ切断時のイベント
    socket.on("disconnect", function () {
        console.log("Disconnected " + url);
    });

    // サーバからメッセージ受信時のイベント
    socket.on("S_to_C_message", function (msg) {
        console.log(msg.value);
        myVue.messageList.push(msg.value);
    });

    var myVue = new Vue({
        el: '#app',

        data: function() {
            return {
                newMessage: '',
                messageList: [],
            }
        },

        created: function() {
        },

        methods: {
            sendMessage() {
                // 空文字チェック
                if (this.newMessage !== "") {
                    // 送信実行
                    socket.emit("C_to_S_message", {value: this.newMessage});

                    // 入力欄を初期化
                    this.newMessage = "";
                }
            },
        }
    });
})();