<template>
    <div>
        <h2>受信メッセージ</h2>
        <ul>
            <li v-for="message in messageList">{{ message }}</li>
        </ul>

        <form @submit.prevent="sendMessage">
            <input type="text" v-model="newMessage">
            <input type="submit" value="Send">
        </form>
    </div>
</template>

<script>
    export default {
        created: function() {
            const url = 'http://localhost:3000';
            socket = io.connect(url);

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
                messageList.push(msg.value);
            });
        },
        data: function() {
            return {
                newMessage: '',
                messageList: [],
            }
        },
        methods: {
            sendMessage() {
                // 空文字チェック
                if (this.newMessage !== "") {
                    // 入力欄を初期化
                    this.newMessage = "";

                    // 送信実行
                    socket.emit("C_to_S_message", {value: this.newMessage});
                }
            }
        }
    }
</script>
