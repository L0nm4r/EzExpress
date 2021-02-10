let mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
  //����Collenction�Ľṹ
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
