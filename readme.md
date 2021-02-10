## 简介
## 项目初始化
1. npm init -y  初始化package.json
2. cnpm install express --save 安装express (--save 表示运行依赖)
3. 新建add.js 入口文件
```js
const express = require('express')

const app = express()

app.get('/',function(req,res){
    res.end('hello,world!')
})

app.listen(4000)
console.log('Server started on port 4000...')
```
4. 修改package.json,设置启动脚本
```json
{
  "name": "ExpressBlog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
之后npm start即可启动项目

5. debug模式
cnpm install nodemon --save-dev (表示开发依赖)
然后修改start启动脚本为nodemon app


## 模板引擎Pug/Jade
开源项目地址 :https://github.com/pugjs/pug
手册: https://pugjs.org/api/getting-started.html
特性:使用缩进代替标签
1. 安装:cnpm install pug --save
2. 修改app.js
```js
const path = require('path')
const app = express()
//模板有关设置
app.set('views',path.join(__dirname,'views')) // 模板路径
app.set('view engine','pug') //模板引擎
```
path:Node.js模块, 提供了一些用于处理文件路径的小工具
`path.join([path1][, path2][, ...])` : 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"
3. 新建模板views/index.pug
写法:
```jade
doctype html
html(lang="en")
  head
  body
    h1 hello,#{name}
```
4. 模板开发
layout.pug
```jade
doctype html
html(lang="en")
  head
  body
    block content 
    br
    hr
    footer 
        p Copyright &copy; 2021
```
index.pug
```jade
extends layout
block content 
  h1 #{title}
  ul 
    each article ,i in articles
      li= article.title  
      =article.author 
```
new.pug //post new article
```jade
extends layout 

block content 
  h1 #{title}
  form(method="post", action="/articles/create")
    .form-group 
      label Title: 
      input.form-control(name="title",type="text")
    .form-group 
      label Author: 
      input.form-control(name="author",type="text")  
    .form-group
      label Body: 
      textarea.form-control(name="body")
    br
    input.btn.btn-primary(type="submit",value="Submit")
```

## MongoDB数据库
1. 安装
Windows下,下载安装包,next,next,next...
2. 启动
`mongod.exe --dbpath="F:\node\mongodb\blog"`
3. 连接
`mongodb://admin:123456@localhost/`
4. 概念解析
SQL+-------------+MongoDB
database          database
table             collection
row               document
column            field
index             index
5. 简单使用
show dbs显示数据库
创建数据库
use nodejs-blog
db.createCollection('articles')
添加记录:
db.articles.insert({
  title:'One',
  author:'lonmar',
  body:'This is article One'
});
查询:
db.articles.find();

## node.js连接&使用MondoDB
使用mongoose, 文档 https://mongoosejs.com/
安装: cnpm install mongoose --save
导入: const mongoose = require('mongoose')
连接: mongoose.connect('mongodb://localhost/dbName', {useNewUrlParser: true, useUnifiedTopology: true});
常用事件:
- error : db.on('error', console.error.bind(console, 'connection error:'));
- open: db.once('open', function() {
  // we're connected!
});

1. 创建一个collection:
```js
// schema
const kittySchema = new mongoose.Schema({
  name: String
});
// turn schema into a Model.
const Kitten = mongoose.model('Kitten', kittySchema);
//use model
const silence = new Kitten({ name: 'Silence' });
```
2. 查询数据: `find()`
```js
Article.find({},function(err,articles){
      res.render('index',{
          title:'index',
          articles: articles
      })
  })
```
3. 增加数据
```js
let article = new Article(req.body);

article.save(function(err) {
  if (err) {
    console.log(err);
    return;
  } else {
    req.flash("success", "Article Added");
    res.redirect('/')
  }
```
4. 修改数据
```js
Article.findById(req.params.id, function(err, article) {
  res.render('edit', {
    title: 'Edit Article',
    article: article
  })
})
```
5. 删除数据
```js
app.delete('/articles/:id', function(req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function(err) {
    if (err) {
      console.log(err);
    }

    res.send('Success');
  })
})
```

## 解析POST body-parser
Node.js body parsing middleware
安装: `cnpm install body-parser --save`
手册: https://www.npmjs.com/package/body-parser
导入: `var bodyParser = require('body-parser')`
```js
bodyParser.text([options]) //解析文本
bodyParser.json([options]) //json
```
examples:
```js
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## bower
对静态文件的处理:
```js
app.use(express.static(path.join(__dirname,'public')))
```
1. bower https://bower.io/
管理js,css等
安装 cnpm install -g bower
2. 配置
配置文件.bowerrc
```json
{
  "directory": "public/bower_components"
}
```
3. 安装bootstrap
Git Bash下 `bower install bootstrap`
然后引入
```jade
link(rel="stylesheet",href="/bower_conponents/bootstrap/dist/css/bootstrap.css")
```
4. 安装jquery
Git Bash下 `bower install jquery`

## express-session
文档: https://github.com/expressjs/session
安装: `cnpm install express-session --save`
导入 `var session = require('express-session')`
添加中间件:
```js
app.use(session({
    secret: 'secret-key', //dangerous!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
```



## flash
安装 `cnpm install express-messages connect-flash --save`
文档 https://github.com/visionmedia/express-messages
把下面代码添加到中间件部分即可
```js
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
```

## 表单验证 express-validator
https://express-validator.github.io/docs/

安装 cnpm install express-validator --save



## bcrypt
cnpm install bcrypt --save
https://www.npmjs.com/package/bcrypt


## Passport
https://github.com/jaredhanson/passport
http://www.passportjs.org/docs/
cnpm install passport --save
cnpm install  passport-local --save



## markdown支持
cnpm install markdown --save