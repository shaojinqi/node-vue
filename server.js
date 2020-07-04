const express = require('express')
const app = express()

// 引入 mongoose
const mongoose = require('mongoose');

//引入解析 post请求的数据(npm i body-parser -S)
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//引入我们的passport 
const passport =require('passport')
app.use(passport.initialize(passport));  //需要初始化一下我们passport 
require('./config/passport')(passport)


const db = require('./config/keys').mongoURL 
 mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res=>{
    console.log('cg');
}).catch(err=>{
    console.log('sb'+err);
})
 
//引入路由模块 
const users = require('./router/api/users')
const profiles=require('./router/api/profiles')
app.use('/api/users',users)
app.use('/api/profiles',profiles)

 
let port = 5002
app.listen(port,()=>{
    console.log('启动成功' + 5002);
})

