//操作数据库的逻辑
let mongoose = require('mongoose')
let { db_url } = require('./config')
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
// connect里面的{ useNewUrlParser: true, useUnifiedTopology: true }必须加，否则不会报错但是有警告
// 用户表
let movieSchema = new mongoose.Schema(
  {
    adminName: String,
    password: String,
    passwordend: String
  },
  { collection: 'admin' }
);
let Admin = mongoose.model('admin', movieSchema);

// 轮播图表
let loopSchema = new mongoose.Schema(
  {
    image: String
  },
  { collection: 'loop' }
);
let Loop = mongoose.model('loop', loopSchema);

// // 商品表
// let commoditySchema = new mongoose.Schema(
//   {
//     name:String,

//   },
//   { collection: 'loop' }
// );
// let Loop = mongoose.model('loop', commoditySchema);

// 将表暴露出去
module.exports = {
  Admin,
  Loop
}