let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  //����Collenction�Ľṹ
  name:{
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true
  },
  username:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  }
})

let User = module.exports = mongoose.model('User',userSchema)