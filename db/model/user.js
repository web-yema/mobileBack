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
    avatar: String,
    entryDate: String
  },
  { collection: 'admin' }
)
let Admin = mongoose.model('admin', movieSchema)

// 轮播图表
let loopSchema = new mongoose.Schema(
  {
    image: String
  },
  { collection: 'loop' }
)
let Loop = mongoose.model('loop', loopSchema)

// 首页商品表
let commoditySchema = new mongoose.Schema(
  {
    name:String, // 商品名称
    image:String, // 商品图片
    Price:Number, // 商品价格
    details:String, // 商品详情介绍
    author:String, // 商品作者
    entryDate: String, // 上架时间
    loop:Array, // 商品详情轮播
    press:String, // 商品出版社
    classification:String // 商品类别
  },
  { collection: 'commodity' }
)
let Commodity = mongoose.model('commodity', commoditySchema)

// 购物车表
let orderSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    entryDate: String,
    num: Number,
    status: Number,
    price: Number
  },
  { collection: 'order' }
)
let Order = mongoose.model('order', orderSchema)

// 我的商品表
// let mycommoditySchema = new mongoose.Schema(
//   {
//     name:String,
//     image:String,
//     Price:Number,
//     entryDate: String
    
//   },
//   { collection: 'mycommodity' }
// )
// let Mycommodity = mongoose.model('mycommodity', mycommoditySchema)


// 将表暴露出去
module.exports = {
  Admin,
  Loop,
  Commodity,
  Order
  // Mycommodity
}