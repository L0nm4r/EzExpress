//模块引入
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')

//数据库
mongoose.connect(config.database,{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection

db.once('open',function(){
    console.log('[*]MongoDB Connected!')
})

db.on('error',function(err){
    console.log(err)
})

let Article = require('./models/article')
const { request } = require('express')
//数据库结束

const app = express()

//中间件
app.use(session({
    secret: config.secret, //dangerous!
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
    // 加上这个flash就显示不出来了!!!
}))

app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

// require('./config').passport
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.get('*',function(req,res,next){
    res.locals.user = req.user || null
    next()
})

//模板有关设置
app.set('views',path.join(__dirname,'views')) // 模板路径
app.set('view engine','pug') //模板引擎


const articles = require('./routes/articles')
const users = require('./routes/users')

app.use('/articles',articles)
app.use('/users',users)
//路由
app.get('/',function(req,res){
    Article.find({},function(err,articles){
        res.render('articles/index',{
            title:'articles',
            articles: articles
        })
    })
})




//监听
app.listen(4000)
console.log('Server started on port 4000...')