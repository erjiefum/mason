const {Wechaty} = require("wechaty");
const qrcodeTerminal = require("qrcode-terminal");
// const { on } = require("superagent");

const bot = new Wechaty({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  // puppetOptions: {
  //   token: '如果有token，填入wechaty获取的token，并把注释放开'
  // }
});
let info = [
  {
    "name": "阿涵",
    "address": "河北省石家庄市长安区南高营回迁四区菜鸟驿站",
    "phone": "18131198680",
    "wechatID": "shan",
    "alias": "shan"
  },
  {
    "name": "楚子航",
    "address": "四川省成都市成华区青龙街道昭觉寺横路富丽锦城",
    "phone": "13281170893",
    "wechatID": "DojaiiiCat",
    "alias": "DojaiiiCat"
  },
  {
    "name": "小小",
    "address": "广州市天河区珠江新城华夏路10号富力中心45楼",
    "phone": "18922444665",
    "wechatID": "Tiny_liu",
    "alias": "左家庄的赵家姑娘"
  },
  {
    "name": "肚肚",
    "address": "江苏省南京市江宁区天元东路818号",
    "phone": "18018039857",
    "wechatID": "",
    "wechatNumber": "L1assasymphonie",
    "alias": "肚肚"
  },
  {
    "name": "林术微",
    "address": "江苏省镇江市京口区禹山北路中南御锦城售楼处",
    "phone": "13952852514",
    "wechatID": "专业辟邪🥨",
    "wechatNumber": "Moira_Destiny5",
    "alias": "专业辟邪"
  },
  {
    "name": "小宁",
    "address": "北京市通州区杨庄路长城国际66栋D9-404",
    "phone": "13223312034",
    "wechatID": "XXX_Tvxq.",
    "wechatNumber": "evilyy2020",
    "alias": "很丑很丑亚姐第九"
  },
  {
    "name": "欣欣",
    "address": "上海市虹口区广灵四路280弄小区12号楼603室",
    "phone": "15086898125",
    "wechatID": "",
    "wechatNumber": "xinxinzi831",
    "alias": "欣欣"
  },
  {
    "name": "铁甲小宝",
    "address": "河南省平顶山市卫东区东安路南段121号商铺安培中心家属院（菜鸟驿站）",
    "phone": "16637501077",
    "wechatID": "",
    "wechatNumber": "NakedIsland___",
    "alias": "三大神捕之四"
  },
  {
    "name": "爱丽丝",
    "address": "广东省江门市江海区外海街道龙溪湖江悦城公园里2栋2902",
    "phone": "13488315728",
    "wechatID": "埃里斯。",
    "wechatNumber": "ALICE0408_",
    "alias": "埃里斯。"
  },
  {
    "name": "汪慧娟",
    "address": "四川省峨眉山市九里镇六七厂家属区菜市场",
    "phone": "18090349500",
    "wechatID": "赵腰静",
    "wechatNumber": "Serendipity171003",
    "alias": "赵腰静"
  },
  {
    "name": "张婧仪的老公",
    "address": "浙江省金华市义乌市稠江街道杨村三区三幢一单元503",
    "phone": "13967958348",
    "wechatID": "闸北陆小哄",
    "wechatNumber": "lhcdelc1107",
    "alias": "闸北陆小哄"
  },
  {
    "name": "天宇",
    "address": "辽宁省抚顺市望花区和平路东段23号楼",
    "phone": "18852893975",
    "wechatID": "LtanY",
    "wechatNumber": "lty307920766",
    "alias": "还真把你儿当吕布了"
  },
  {
    "name": "小王",
    "address": "山东省青岛市李沧区京口路133路惠客友超市",
    "phone": "13305426514",
    "wechatID": "Amin",
    "wechatNumber": "laosuniu",
    "alias": "Amin"
  },
  {
    "name": "syyyy",
    "address": "浙江省杭州市余杭区五常大道156号西溪软件园巨蟹座A3009",
    "phone": "15957120029",
    "wechatID": "syyyy",
    "wechatNumber": "wxid_4ildn8v0qd9412",
    "alias": "家大业大"
  },
  {
    "name": "傲寒",
    "address": "湖北省武汉市江汉区江汉经济开发区江发路11号冠寓江发路店",
    "phone": "13461230356",
    "wechatID": "傲寒",
    "wechatNumber": "fan540027549",
    "alias": "傲寒"
  },
  {
    "name": "莫小贝",
    "address": "河南省漯河市源汇区银江路乐享游泳健身",
    "phone": "18739599225",
    "wechatID": "-",
    "wechatNumber": "fouragain",
    "alias": "莫小贝的糖葫芦"
  },
  {
    "name": "舍予",
    "address": "北京市朝阳区小关街道惠新东街10号对外经济贸易大学 ",
    "phone": "18801333435",
    "wechatID": "舍予小甜豆儿🍬",
    "wechatNumber": "Chloe3123",
    "alias": "舍予小甜豆儿"
  },
  {
    "name": "火辣辣的疼",
    "address": "上海市闵行区浦江镇滨浦五村7号楼1002",
    "phone": "18829898795",
    "wechatID": "火辣辣的疼",
    "alias": "火辣辣的疼"
  }
]
bot
.on('scan', (qrcode) => {
    qrcodeTerminal.generate(qrcode);
})
.on('login', async (user) => {
    console.log(`${user.name()} is logined`);
    
})
.on('message',async (msg) => {
  const contact = msg.talker(); // 发消息人
  const content = msg.text().trim(); // 消息内容
  const room = msg.room(); // 是否是群消息
  const alias = await contact.alias() || await contact.name(); // 发消息人备注
  console.log(`${alias}: ${content}`)
  if(content==='核对报名信息' && alias==='火辣辣的疼'){
    console.log('准备开始核对报名信息')
    info.forEach(async (element) => {
      const contactFriend = await bot.Contact.find({alias: element.alias})
      if(contactFriend){
        console.log(`找到了好友: ${element.alias}, 准备发送消息`)
        if(element.alias === '火辣辣的疼'){
          let msg = `请核对您在微信群同福客栈老白涮肉坊中报名参加的礼物互送活动的报名信息:
  
          地址: ${element.address},
          电话: ${element.phone},
          收件人: ${element.name}
  
          如以上信息无误请回复0,如果信息有误请回复需要修改的地方,谢谢
          `
          await contactFriend.say(msg)
        }
      }else{
        console.error(`没有找到好友: ${element.alias}`)
      }
    })
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
}).on('ready', friendship => {
  // info.forEach(async (element) => {
  //   const contactFriend = await bot.Contact.find({alias: element.alias})
  //   if(contactFriend){
  //     console.log(`找到了好友: ${element.alias}, 准备发送消息`)
  //     if(element.alias === '火辣辣的疼'){
  //       let msg = `请核对您在微信群同福客栈老白涮肉坊中报名参加的礼物互送活动的报名信息:

  //       地址: ${element.address},
  //       电话: ${element.phone},
  //       收件人: ${element.name}

  //       如以上信息无误请回复0,如果信息有误请回复需要修改的地方,谢谢
  //       `
  //       await contactFriend.say(msg)
  //     }
  //   }else{
  //     console.error(`没有找到好友: ${element.alias}`)
  //   }
  // })
  // const contactFriend = await bot.Contact.find({alias: '火辣辣的疼'})
  // console.log(contactFriend)
  // await contactFriend.say('fuck you, 嘿嘿')
})
.start();