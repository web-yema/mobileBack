let express = require("express")
let path = require("path")
let bodyParse = require("body-parser")
let cors = require("cors") // 跨域
// let history = require('connect-history-api-fallback');// 路由模式为history时使用
let jwt = require("jsonwebtoken") // jwt 持久化登录
const multer = require("multer") // 上传头像
let app = express()
app.use(bodyParse.json())
app.use(cors()) // 跨域中间件
// app.use(history()); // 使用history中间件
// 从user里边解构出的各个信息的表
let {
  Admin,
  Loop
} = require("../db/model/user")
// 配置静态资源
// app.use(express.static(path.join(__dirname, '../public')))

// 注册
app.post("/register", (req, res) => {
  const { username,password } = req.body
  Admin.findOne({ adminName: username },(err,ret) => {
    if(err){
      return console.log("查询失败")
    }
    if(ret){
      return res.json({ code: "201", message: "该用户已存在!" })
    }
    let user = new Admin({
      adminName: username,
      password: password,
    })
    if(user.adminName === '' || user.password === ''){
      return res.json({ code: "202", message: "用户名或密码不能为空!" })
    }
    let regName = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){3,15}$/
    let regPass = /^[a-z+A-Z+0-9+]{3,15}$/
    if(regName.test(user.adminName)){
      return res.json({ code: "202", message: "4到16位(字母，数字，下滑线，减号)!" })
    }
    if(regPass.test(user.password)){
      return res.json({ code: "203", message: "密码最少6位，最多16位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符(指的是._-)!" })
    }
    user.save(function(err, ress) {
      if(err){
        return console.log(err)
      }
      res.json({
        code: "200",
        message1: `${ress.adminName}`,
        message2: `${ress.password}`
      })
    })
  })
})

// 登录
app.post("/login", (req, ress) => {
  const { username, password } = req.body
  Admin.findOne({ adminName: username }, (err, ret) => {
    if (err) {
      return console.log("查询失败")
    }
    if (ret) {
      const { adminName } = ret
      if (ret.password === password)
        return ress.json({
          code: 200,
          data: {
            token: jwt.sign({ username: adminName }, "abcd", {
              // 过期时间
              expiresIn: "1h"
            })
          },
          msg: "登录成功"
        });
      ress.json({ code: 201, message: "密码不正确" });
    } else if( username === '' || password === '' ){
      ress.json({
        code: 202,
        message: "用户名或密码不能为空!"
      })
    } else {
      ress.json({
        code: 202,
        message: "该用户未注册"
      })
    }
  })
})

// 轮播图
app.post('/loop',(req,res) => {
  const { image } = req.body
  let loop  = new Loop({
    image:image
  })
  loop.save(function(err,ress){
    if(err){
      return console.log(err)
    }
    res.json({
      code: "200",
      message: `${ress.image}`,
    })
  })
})

// 商品列表


// 监听是否启动
app.listen(3003, () => {
    console.log("3003启动成功!");
});