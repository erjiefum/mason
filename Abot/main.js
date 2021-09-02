const {Wechaty} = require("wechaty");
const qrcodeTerminal = require("qrcode-terminal");
const { on } = require("superagent");

const bot = new Wechaty({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  // puppetOptions: {
  //   token: '如果有token，填入wechaty获取的token，并把注释放开'
  // }
});

bot
.on('scan', (qrcode) => {
    qrcodeTerminal.generate(qrcode);
})
.on('login', (user) => {
    console.log(`${user.name()} is logined`);
})
.on('message',async (msg) => {
  const contact = msg.talker(); // 发消息人
  const content = msg.text().trim(); // 消息内容
  const room = msg.room(); // 是否是群消息
  const alias = await contact.alias() || await contact.name(); // 发消息人备注
  console.log(`${alias}: ${content} `);
  if(content=="test"){
    let targetRoom = await bot.Room.find({topic: content});
    await targetRoom.add(contact);
  }
  if(room&&content=="退群"){
    let targetRoom = await bot.Room.find({topic: 'test'});
    console.log(targetRoom)
    let memberIdList = targetRoom.payload.memberIdList;
    memberIdList.forEach(async item => {
      console.dir(await bot.Contact.find({id:item}))
    })
    // await targetRoom.say(JSON.stringify(targetRoom));
    
  }
})
.on("room-join",(msg) => {
  console.log("room-join")
  console.log(msg)
})
.on("room-leave",(msg) => {
  console.log("room-leave")
  console.log(msg)
})
.on("room-topic",(msg) => {
  console.log("room-topic")
  console.log(msg)
})
.start();