const LastTenMsg = require('./lastTenMsg');
const getLuck = require('./getLuck');
const keywords = require('./keywords');
let msgs = new LastTenMsg();
let resovleChatContent = (msg, callback) => {
    if(msgs.lastTenMsg.length==10){
        msgs._shift();
    }
    msgs._push(msg);
    let msgList = msgs.lastTenMsg;
    let type = judegType(msgList);
    answer(msgList,type,callback);
}
let judegType = (msgList) => {
    let last1Content = msgList[msgList.length - 1].content;
    // let last1Member = msgList[msgList.length - 1].roomMember;
    // let last2Content = msgList[msgList.length - 2]?.content;
    // let last2Member = msgList[msgList.length - 2]?.roomMember;
    // let content = "";
    // if(last1Member==last2Member){
    //     content = last2Content + last1Content;
    // }else{
        content = last1Content;
    // }

    for(let key in keywords){
        let keyword = keywords[key].keyword;
        let type = keywords[key].type;
        if(typeof keyword == "string"){
            if(content.indexOf(keyword)!=-1){
                return type;
            }
        }else{
            if(content.indexOf(keyword[0]) != -1 && content.indexOf(keyword[1]) != -1){
                return type;
            }
        }
    }
    // if(lastContent.indexOf("座")!=-1&&lastContent.indexOf("今日运势")!=-1){
    //     getLuck(lastContent.substring(lastContent.indexOf("座")-2,lastContent.indexOf("座")+1), callback)
    // }else{
    //     callback(null)
    // }
}

let answer = (msgList,type,callback) => {
    let last1Content = msgList[msgList.length - 1].content;
    // let last1Member = msgList[msgList.length - 1].roomMember;
    // let last2Content = msgList[msgList.length - 2]?.content;
    // let last2Member = msgList[msgList.length - 2]?.roomMember;
    // let content = "";
    // if(last1Member==last2Member){
    //     content = last2Content + last1Content;
    // }else{
        content = last1Content;
    // }
    switch (type) {
        case 0:
            callback(null);
            break;
        
        case 1:
            console.log("ready to getLuck");
            getLuck(content.substring(content.indexOf("座")-2,content.indexOf("座")+1),callback);
            break;
        
        case 2:
            callback(null);
            break;
    
        default:
            callback(null)
            break;
    }
}
module.exports = resovleChatContent;