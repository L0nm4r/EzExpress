let mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
  //定义Collenction的结构
  title:{
    type: String,
    require: true
  },
  author:{
    type: String,
    require: true
  },
  body:{
    type: String,
    require: true
  }
})

let Article = module.exports = mongoose.model('Article',articleSchema)
