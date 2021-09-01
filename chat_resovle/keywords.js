/**
 * 0 - getFood
 * 1 - getLuck
 * 2 - getNextWord
 * 3 - getSong
 * 4 - getStore
 * 5 - getWeather
 */
let keywords = [
    {keyword:"不知道吃啥", type: 0},
    {keyword:"中午吃啥呢", type: 0},
    {keyword:"晚上吃啥呢", type: 0},
    {keyword:"吃点啥呢", type: 0},
    {keyword:"不知道吃什么", type: 0},
    {keyword:"中午吃什么", type: 0},
    {keyword:"晚上吃什么", type: 0},
    {keyword:['座', '今日运势'], type: 1}
    // {keyword:"", type: 2}
    // {keyword:"", type: 3}
    // {keyword:"", type: 4}
]

module.exports = keywords;