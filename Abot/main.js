const {Wechaty} = require("wechaty");
const qrcodeTerminal = require("qrcode-terminal");

const bot = new Wechaty();

bot
.on('scan', (qrcode) => {
    qrcodeTerminal.generate(qrcode);
})
.on('login', (user) => {
    console.log(`${user.name()} is logined`);
})
.on('message', (msg) => {
    console.log(msg);
}).start();