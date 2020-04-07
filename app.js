
//var app = require('http').createServer()
var ws = require("nodejs-websocket");
const PORT=3000;
var user = 0;
var server = ws.createServer(function(conn){

    console.log("new  connection user");
    user++;
    var name = "用户："+user;
    var msg = {};
    msg.type="enter"
    msg.data=name+" 进入了..."
    broadcase(JSON.stringify(msg))
    conn.on("text",function(str){ 
        var msg = {};
        msg.type="message"
        msg.data=name+"说："+str
        broadcase(JSON.stringify(msg))
           console.log("received" + str)
          // broadcase(JOSN.stringify(msg))
           //conn.sendText(name+"say:"+str)
    });
    conn.on("close",function(code,reason){
        console.log("connection closed");
        var msg = {};
        msg.type="leave"
        msg.data=name+" 离开了..."
        broadcase(JSON.stringify(msg))
        //broadcase(name+"离开了...")
    });
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT);
console.log("server listening on port :"+PORT)

function broadcase(str){
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}
/**1.记录用户名
 *  var user=0;
 * 2.分配用户名   用户名组成  临时自定义 user + 每次新用户进来加1
 *  var userName="user"+user 
 * 3.知道谁进来了
 *  conn.sendText(userName+str)
 * 4.让所有人看见 广播
 *  broadcase()
*/