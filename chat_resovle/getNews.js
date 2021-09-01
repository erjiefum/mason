const request = require('request');
const fs = require('fs');
const path = require("path");

let getNewDate = () => {
  let thisTime = new Date();
  let year = thisTime.getFullYear();
  let month = thisTime.getMonth() + 1;
  let day = thisTime.getDate();
  return year + "-" + month + "-" + day;
}

const writer = fs.createWriteStream(path.join(__dirname,"../chat_record/todayNews."+getNewDate()+".txt"), {
  flags: 'w', //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
})

let getNews = (url) => {
  request(url, (error, response, body) => {
    let news = "【江湖小报，一分钟知江湖事】" + getDate(body);
    for(let i = 1; i < 30; i++){
      let res = getNewsByNum(i,body);
      if(res){
          news += (res + '\n');
      }else{
          break;
      }
    }
    news += "\n"
    news += ('【老鸭汤】' + getLaoyatang(body) + '\n');
    // console.log(news);
    writer.write(news);
  })
}

let getLaoyatang = (str) => {
  let start = str.indexOf("【心语】");
  str = str.substring(start+4);
  let end = str.indexOf('。') + 1;
  return str.substring(0, end);
}

let getNewsByNum = (n,str) => {
  // />[\u4E00-\u9FA5①②③④⑤ⅠⅡⅢⅣβγα@#$（）+=/\|·：: \[\]\~\{\}，。、“”；%！《》.0-9a-zA-Z]{10,}</g
  // let reg = /、[\u4E00-\u9FA5①②③④⑤ⅠⅡⅢⅣβγα@#$（）+=/\|·：: \[\]\~\{\}，。、“”；%！《》.0-9a-zA-Z]{10,}</g
  let startFlag = str.indexOf(`>${n}、`);
  if(startFlag!=-1){
      str = str.substring(startFlag);
      let news = str.indexOf("。") + 1;
      return str.substring(1, news);
  }else{
      return false;
  }
  
}

let getDate = (str) => {
  let start = str.indexOf("农历");
  str = str.substring(start);

  let CNNum = [0,"一","二","三","四","五","六","日"]

  let today = new Date();
  let month_ = today.getMonth() + 1;
  let date_ = today.getDate();
  let day_ = today.getDay();
  return month_ + "月" + date_ + "日 星期" + CNNum[day_] + " " + str.substring(0, 6) +"\n\n";
}

module.exports = getNews;