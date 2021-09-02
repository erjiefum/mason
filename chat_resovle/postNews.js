const fs = require('fs');
const path = require("path");

let getNewDate = () => {
  let thisTime = new Date();
  let year = thisTime.getFullYear();
  let month = thisTime.getMonth() + 1;
  let day = thisTime.getDate();
  return year + "-" + month + "-" + day;
}
console.log(getNewDate());
let postNews = (callback) => {
  fs.readFile(path.join(__dirname, "../chat_record/todayNews."+getNewDate()+".txt"),"utf-8",(err,data) => {
    if(err){
        console.log("error", err);
    }else{
      console.log(data);
        callback(data);
    }
  });
}

module.exports = postNews;
