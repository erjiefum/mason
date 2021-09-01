class LastTenMsg {
    constructor(){
        this.lastTenMsg = []
    }
    _shift = () => {
        this.lastTenMsg.shift();
    }
    _push = (data) =>{
        this.lastTenMsg.push(data);
    }
}

module.exports = LastTenMsg;