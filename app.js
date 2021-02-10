//ģ������
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')

//���ݿ�
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
//���ݿ����

const app = express()

//�м��
app.use(session({
    secret: config.secret, //dangerous!
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
    // �������flash����ʾ��������!!!
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

//ģ���й�����
app.set('views',path.join(__dirname,'views')) // ģ��·��
app.set('view engine','pug') //ģ������


const articles = require('./routes/articles')
const users = require('./routes/users')

app.use('/articles',articles)
app.use('/users',users)
//·��
app.get('/',function(req,res){
    Article.find({},function(err,articles){
        res.render('articles/index',{
            title:'articles',
            articles: articles
        })
    })
})




//����
app.listen(4000)
console.log('Server started on port 4000...')