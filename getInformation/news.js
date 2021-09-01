const request = require('request');

let getNews = (callback) => {
    // 默认发送get请求
    request('https://www.163.com/dy/media/T1555322143233.html', async (error, response, body) => {
        let url = getLastNews(body);
        let news = "【江湖小报，一分钟知江湖事】" + getDate(body);
        await request(url, (err, res, body) => {
            for(let i = 1; i < 30; i++){
                let res = getNewsByNum(i,body);
                if(res){
                    // console.log(res);
                    news += (res + '\n');
                }else{
                    break;
                }
            }
            news += ('【老鸭汤】' + getLaoyatang(body) + '\n');
            callback(news)
        })
    });
}


let getLastNews = (str) => {
    let url_ = str.indexOf('#第') - 2;
    let _url = url_ - 52;
    return str.substring(_url, url_);
}

let getNewsByNum = (n, str) => {
    let startFlag = str.indexOf(`>${n}、`);
    if(startFlag!=-1){
        str = str.substring(startFlag);
        let news = str.indexOf("。") + 1;
        return str.substring(1, news);
    }else{
        return false;
    }
}

let getLaoyatang = (str) => {
    let start = str.indexOf("【心语】");
    str = str.substring(start+4);
    let end = str.indexOf('。') + 1;
    return str.substring(0, end);
}

let getDate = (str) => {
    let start = str.indexOf("农历");
    str = str.substring(start);

    let CNNum = ["一","二","三","四","五","六","日"]

    let today = new Date();
    let month_ = today.getMonth() + 1;
    let date_ = today.getDate();
    let day_ = today.getDay();
    return month_ + "月" + date_ + "日 星期" + CNNum[day_] + " " + str.substring(0, 6) +"\n\n";
}

module.exports = getNews;