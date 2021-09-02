/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const { Wechaty } = require('wechaty');
const schedule = require('./schedule/index');
const config = require('./config/index');
const untils = require('./utils/index');
const superagent = require('./superagent/index');
// const getNews = require('./getInformation/news');
const resovleChatContent = require('./chat_resovle/index');
const fs = require('fs');
const getNews = require("./chat_resovle/getNews");
const postNews = require("./chat_resovle/postNews");
const path = require("path");
// 延时函数，防止检测出类似机器人行为操作
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 二维码生成
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');

  console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`);
  const date = new Date()
  console.log(`当前容器时间:${date}`);
  if (config.AUTOREPLY) {
    console.log(`已开启机器人自动聊天模式`);
  }

  // 登陆后创建定时任务
  await initDay();
}

// 登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`);
}

// 监听对话
async function onMessage(msg) {
  // console.log(msg)
  const contact = msg.talker(); // 发消息人
  let thisText = msg.payload.text;
  if(thisText.indexOf("#第")!=-1&&thisText.indexOf("http")!=-1&&thisText.indexOf('每天一分钟，简报知天下！')!=-1){
    let _url = thisText.indexOf("http");
    thisText = thisText.substring(_url);
    let url_ = thisText.indexOf(";<br/>")
    let url = thisText.substring(0, url_);
    getNews(url);
  }
  const content = msg.text().trim(); // 消息内容
  const room = msg.room(); // 是否是群消息
  const alias = await contact.alias() || await contact.name(); // 发消息人备注
  // console.log("alias: ", alias);
  const isText = msg.type() === bot.Message.Type.Text;


  if (room && isText) { 
    let roomReg = eval(config.ROOMNAME)
    let keyRoom = await this.Room.find({topic: roomReg})
    // console.log(keyRoom);
    // 如果是群消息 目前只处理文字消息
    const topic = await room.topic();
    if(roomReg.source.indexOf(topic)!=-1){
      const writer = fs.createWriteStream("./chat_record/"+topic+'.txt', {
        flags: 'a', //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
      })
      let roomMember = await contact.name();
      //写入数据到流
      writer.write(`${new Date()}  ${roomMember}: ${content} \n`, 'utf8')
      if (msg.self()) {
        return;
      }
      console.log(`群名: ${topic} 发消息人: ${roomMember} 内容: ${content}`);
  
      let newMsg = {
        currentTime: new Date(),
        roomName: topic,
        roomMember: roomMember,
        content: content
      }
      resovleChatContent(newMsg, async (answer) => {
        if(answer){
          console.log(`@${newMsg.roomMember} ${answer}`);
          await keyRoom.say(`@${newMsg.roomMember} ${answer}`);
        }else if(content.indexOf("@火辣辣的疼")!=-1){
          let reply = await superagent.getTuLingReply(content);
          console.log("群名: 同福客栈老白涮肉坊 发消息人: 火辣辣的疼 内容:"+reply);
          await keyRoom.say(`@${newMsg.roomMember} ${reply}`);
        }
      })
    }
  } else if (isText) {
    const writer = fs.createWriteStream(alias+'.txt', {
      flags: 'a', //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
    })
    console.log(`${alias}: ${content}`)
    //写入数据到流
    writer.write(`${new Date()}  ${alias}: ${content} \n`, 'utf8')
    let newMsg = {
      currentTime: new Date(),
      roomName: "马月半",
      roomMember: "马月半",
      content: content
    }
    // resovleChatContent(newMsg, async (answer) => {
    //   await contact.say(answer);
    // })
    // 如果非群消息 目前只处理文字消息
    // console.log(`发消息人: ${alias} 消息内容: ${content}`);
    // if (content.substr(0, 1) == '?' || content.substr(0, 1) == '？') {
    //   let contactContent = content.replace('?', '').replace('？', '');
    //   if (contactContent) {
    //     let res = await superagent.getRubbishType(contactContent);
    //     await delay(2000);
    //     await contact.say(res);
    //   }
    // } else 
    if (config.AUTOREPLY && config.AUTOREPLYPERSON.indexOf(alias) > -1) {
      // 如果开启自动聊天且已经指定了智能聊天的对象才开启机器人聊天
      if (content) {
        let reply;
        if (config.DEFAULTBOT == '0') {
          // 天行聊天机器人逻辑
          // reply = await superagent.getReply(content);
          // console.log('天行机器人回复：', reply);
          reply = "你好呀"
        } else if (config.DEFAULTBOT == '1') {
          // 图灵聊天机器人
          reply = await superagent.getTuLingReply(content);
          // console.log('图灵机器人回复：', reply);
        } else if (config.DEFAULTBOT == '2') {
          // 天行对接的图灵聊
          reply = await superagent.getTXTLReply(content);
          console.log('天行对接的图灵机器人回复：', reply);
        }
        try {
          // await delay(2000);
          // console.log(contact);
          await contact.say(reply);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

// 创建微信每日说定时任务
async function initDay() {
  console.log(`已经设定每日任务`);
  
  schedule.setSchedule(config.SENDDATE, async () => {
    console.log('准备开始发送每日江湖小报！');
    let roomReg = eval(config.ROOMNAME)
    let keyRoom = await bot.Room.find({topic: roomReg})
    let contact =
      (await bot.Contact.find({ name: config.NICKNAME })) ||
      (await bot.Contact.find({ alias: config.NAME })); // 获取你要发送的联系人
    postNews(async news => {
      console.log(news);
      try {
        await delay(2000);
        await keyRoom.say(news); // 发送消息
      } catch (e) {
        
      }
    });
    
    
  });
}

const bot = new Wechaty({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  // puppetOptions: {
  //   token: '如果有token，填入wechaty获取的token，并把注释放开'
  // }
});

async function roomLeave(msg){
  console.log("room-leave");
  console.log(msg);
}
async function roomJoin(msg){
  console.log("room-join");
  console.log(msg);
}
async function roomTopic(msg){
  console.log("room-topic");
  console.log(msg);
}
async function roomInvite(msg){
  console.log("room-invite");
  console.log(msg);
}
bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
bot.on('room-leave', roomLeave);
bot.on('room-join', roomJoin);
bot.on('room-topic', roomTopic);
bot.on('room-invite', roomInvite);

bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e));
