const officegen = require('officegen');
const mammoth = require('mammoth');
const fs = require('fs')
const docx = officegen('docx');

let getNextWord = (content) => {
  fs.readFile("../chat_record/武林外传19.txt", 'utf-8',(err, data) => {
    data = "{\"value\":" + data + "}"
    let arr = JSON.parse(data).value;
  })
}


// const writer2 = fs.createWriteStream("../chat_record/武林外传19"+'.txt', {
//     flags: 'a', //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
// })
// fs.readFile("../chat_record/武林外传18.txt", 'utf-8',(err, data) => {
//     // console.log("data.length---------------", data[0], data[data.length-1])
//     data = "{\"value\":" + data + "}"
//     let arr = JSON.parse(data).value;
//     // console.log(typeof arr);
//     writer2.write("[")
//     arr.forEach((item) => {
//       console.log(item)
//         let name = item.name;
//         let content = item.content;
//         let other = undefined;
//         let maybeFlag = content.indexOf("南宫残花：");
//         if(maybeFlag!=-1){
//           content = content.substring(0,maybeFlag);
//           other = `{
//             "name": ${content.substring(maybeFlag,maybeFlag+3)},
//             "content": ${content.substring(maybeFlag+4)}
//           },`
//         }
//         if(name.length < 6){
//             writer2.write(`{
//                 "name": "${name}",
//                 "content": "${content}"
//             },`)
//         }
//         if(other){
//           writer2.write(other);
//         }
        
//     })
//     writer2.write(']')
//     console.log(arr[0]);
// })

