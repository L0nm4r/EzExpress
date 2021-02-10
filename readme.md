## introduction

practice for Express beginners, just for fun

![image](https://github.com/L0nm4r/EzExpress/blob/master/README/1612942806489.png)


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
    "start": "node app" //there
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

`cnpm install nodemon --save-dev` (表示开发依赖)

然后修改start启动脚本为`nodemon app`


## 模板引擎Pug/Jade

开源项目地址 :https://github.com/pugjs/pug

手册: https://pugjs.org/api/getting-started.html

特性:使用缩进代替标签

1. 安装:cnpm install pug --save
2. 导入
```js
const path = require('path')
const app = express()
//模板有关设置
app.set('views',path.join(__dirname,'views')) // 模板路径
app.set('view engine','pug') //模板引擎
```
`path`:Node.js模块, 提供了一些用于处理文件路径的小工具

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
`#{name}`: 转义html标签

`!{name}`: 不转义html标签

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

SQL =>MongoDB

database => database

table  =>collection

row    =>      document

column   =>  field

index =>    index

5. 简单使用

show dbs显示数据库

创建数据库 
```js
use nodejs-blog
db.createCollection('articles')
```
添加记录:
```js
db.articles.insert({
  title:'One',
  author:'lonmar',
  body:'This is article One'
});
```
查询:`db.articles.find();`

## node.js连接&使用MondoDB
使用mongoose, 文档 https://mongoosejs.com/

安装: `cnpm install mongoose --save`

导入: `const mongoose = require('mongoose')`

连接: `mongoose.connect('mongodb://localhost/dbName', {useNewUrlParser: true, useUnifiedTopology: true});`

常用事件:
- `error` : db.on('error', console.error.bind(console, 'connection error:'));
- `open`: db.once('open', function() {
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
    article: article //json
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

## express.static

对静态文件的处理:
```js
app.use(express.static(path.join(__dirname,'public')))
```
## bower

1. bower https://bower.io/ , 管理js,css等

安装 cnpm install -g bower

2. 配置: 配置文件.bowerrc
```json
{
  "directory": "public/bower_components" //文件保存路径
}
```
3. 安装bootstrap
Git Bash下 `bower install bootstrap`, 然后引入
```jade
link(rel="stylesheet",href="/bower_conponents/bootstrap/dist/css/bootstrap.css")
```
4. 安装jquery
Git Bash下 `bower install jquery`

## express-session
文档: https://github.com/expressjs/session

安装: `cnpm install express-session --save`

easy to use
```js
...
var session = require('express-session')
...
// 中间件
app.use(session({
    secret: 'secret-key', //dangerous!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
...
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
使用: `req.flash('status','message')`
```js
router.get('/logout', function(req, res){
  req.logout()
  req.flash('success', 'You are logged out')
  res.redirect('/users/login')
})
```
模板: 在合适位置添加 `!= messages('message', locals)` (only for jade/pug)

## 表单验证 express-validator

express-validation是一个中间件,它验证请求的body, params, query, headers 和 cookies

https://express-validator.github.io/docs/

安装 `cnpm install express-validator --save`

usage:
```js
//import
const { check, validationResult } = require('express-validator')
//....
router.post('/create',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('body').isLength({ min: 1 }).withMessage('Body is required')
] ,function(req,res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      // ...
  }else{
      // ...
})
//....
```

## bcrypt
cnpm install bcrypt --save

https://www.npmjs.com/package/bcrypt

use:
1. `encrypt`
```js
const bcrypt = require('bcrypt')
// ...
let user = new User(req.body)
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(user.password, salt, function(err, hash) {
      if(err){
        console.log(err)
        return
      }
      user.password = hash // use hash
      // ...
  });
});
```
2. `verification`
```js
bcrypt.compare(password, user.password, function(err, isMatch) {
  if (err){
    console.log(err)
    return 
  }

  if (isMatch) {
    // ...
  } else {
    // ...
  }
})
```

## Passport
https://github.com/jaredhanson/passport

http://www.passportjs.org/docs/

安装:

`cnpm install passport --save`

`cnpm install  passport-local --save`

Passport项目是一个基于Nodejs的认证中间件.Passport目的只是为了`登陆认证`,因此,代码干净,易维护,可以方便地集成到其他的应用中

Web应用一般有2种登陆认证的形式,passport均支持
- 用户名和密码认证登陆
- OAuth认证登陆

用户名和密码认证实现:
1. passport本身是没有验证功能的,需要设置一个策略才可以使用

本地策略: 依赖`passport-local`
```js
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        // 数据库查询返回user
        if (!user) { return done(null, false, { message: 'No User Found' }); }
        // 验证密码
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        })

      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
```
2. 导入

app.js

```js
const passport = require('passport')
require('./config').passport

//初始化
app.use(passport.initialize())
app.use(passport.session())
/// ...
```
3. 使用:
```js
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: 'Check your Password Or Username!',
    successFlash: 'Welcome!'
  })(req, res, next);
});
```

tips:

1. authenticate后可以返回req.user 指代当前用户.

2. 模板中获取当前用户:
```js
app.get('*',function(req,res,next){
    res.locals.user = req.user || null
    next()
})
```

## markdown支持

### markdown
`cnpm install markdown --save`
```js
const markdown = require('markdown').markdown
//...
article.body=markdown.toHTML(article.body)
res.render('articles/show',{
    article:article,
    author:user.name
})
//...
```
效果一般

### marked
`cnpm install marked --save`

效果比较好
```js
const marked = require('marked')

article.body=marked(article.body)
res.render('articles/show',{
    article:article,
    author:user.name
})
```