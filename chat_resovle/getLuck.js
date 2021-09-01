const request = require('request');
let constellationList = {
    白羊座: {name:"白羊座", urlName:"Aries"},
    金牛座: {name:"金牛座", urlName:"Taurus"},
    双子座: {name:"双子座", urlName:"Gemini"},
    巨蟹座: {name:"巨蟹座", urlName:"Cancer"},
    狮子座: {name:"狮子座", urlName:"Leo"},
    处女座: {name:"处女座", urlName:"Virgo"},
    天秤座: {name:"天秤座", urlName:"Libra"},
    天蝎座: {name:"天蝎座", urlName:"Scorpio"},
    射手座: {name:"射手座", urlName:"Sagittarius"},
    摩羯座: {name:"摩羯座", urlName:"Capricorn"},
    水瓶座: {name:"水瓶座", urlName:"Aquarius"},
    双鱼座: {name:"双鱼座", urlName:"Pisces"},
}
let fiveList = [
    "感情","健康","财运","工作","综合",
]
let threeList = [
    "幸运颜色","幸运数字","速配星座",
]

let cache = {};
//flag class="txt"><p>
let baseUrl = "https://www.d1xz.net/yunshi/today/";

let getLuck = (name,callback) => {
    let url = constellationList[name]?.urlName;
    // if(cache[name]){
    //     callback(cache[name]);
    //     return ;
    // }
    if(url){
        // 默认发送get请求
        let txt = name + "\n\n";
        request(baseUrl + constellationList[name].urlName, async (error, response, body) => {
            txt += (getContent(body) + '\n\n');
            fiveList.forEach(item => {
                txt += (getEmotion(body, item) + '\n')
            })
            txt += "\n"
            threeList.forEach(item => {
                txt += (getColor(body, item) + '\n')
            })
            cache[name] = txt;
            callback(txt);
        });
    }else{
        callback(`地球上好像没有这个星座，难道你是外星人吗？`)
    }
    
}

let getContent = (body) => {
    let _luck = body.indexOf('class="txt"><p>') + 15;
    let str = body.substring(_luck);
    let luck_ = str.indexOf("</p>");
    let content = str.substring(0, luck_);
    // console.log(content);
    return content;
}

let getEmotion = (body, item) => {
    let _emotion = body.indexOf("<b>"+item+"</b>") + 9;
    let str = body.substring(_emotion);
    let emotion_ = str.indexOf("%");
    let emotion = str.substring(23, emotion_);
    // console.log(item + emotion + "%");
    return item + "：" + emotion + "%";
}

let getColor = (body, item) => {
    let color_ = body.indexOf(item);
    let str = body.substring(0, color_);
    let _color = str.lastIndexOf('class="words_t">') + 16;
    let color = str.substring(_color, (() => {
        if(item === "幸运颜色"){
            return _color + 2
        }else if(item === "幸运数字"){
            return _color + 1
        }else if(item === '速配星座'){
            return _color + 3
        }
    })());
    // console.log(item + "：" + color);
    if(color.lastIndexOf("<")!=-1){
        color = color.substring(0,color.lastIndexOf("<"))
    }
    return item + "：" + color;
}
module.exports = getLuck;