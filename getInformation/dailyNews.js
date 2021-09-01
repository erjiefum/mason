//https://mp.weixin.qq.com/s/RERiCtj3nClQA5tku3sUkw
const request = require('request');

// 默认发送get请求
request('https://mp.weixin.qq.com/s/RERiCtj3nClQA5tku3sUkw', function (error, response, body) {
 // 请求完成之后的回调函数	
//  console.log("----------res");
//  console.log(response);
//  console.log("----------body");
//  console.log(body.indexOf("1、"));
    getNewsByNum(1, body);
});
let getNewsByNum = (n, str) => {
    let startFlag = str.indexOf(`${n}、`);
    str = str.substring(startFlag);
    let _news = str.indexOf("break-word") +25;
    let news_ = str.indexOf("，");
    let result = str.substring(_news, news_);
    console.log("----------------");
    console.log(result);
}