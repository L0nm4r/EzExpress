## introduction

practice for Express beginners, just for fun

![image](https://github.com/L0nm4r/EzExpress/blob/master/readme/1612942806489.png)


## ��Ŀ��ʼ��
1. npm init -y  ��ʼ��package.json
2. cnpm install express --save ��װexpress (--save ��ʾ��������)
3. �½�add.js ����ļ�
```js
const express = require('express')

const app = express()

app.get('/',function(req,res){
    res.end('hello,world!')
})

app.listen(4000)
console.log('Server started on port 4000...')
```
4. �޸�package.json,���������ű�
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
֮��npm start����������Ŀ

5. debugģʽ

`cnpm install nodemon --save-dev` (��ʾ��������)

Ȼ���޸�start�����ű�Ϊ`nodemon app`


## ģ������Pug/Jade

��Դ��Ŀ��ַ :https://github.com/pugjs/pug

�ֲ�: https://pugjs.org/api/getting-started.html

����:ʹ�����������ǩ

1. ��װ:cnpm install pug --save
2. ����
```js
const path = require('path')
const app = express()
//ģ���й�����
app.set('views',path.join(__dirname,'views')) // ģ��·��
app.set('view engine','pug') //ģ������
```
`path`:Node.jsģ��, �ṩ��һЩ���ڴ����ļ�·����С����

`path.join([path1][, path2][, ...])` : ��������·�����÷�������Ҫ��;���ڣ�����ȷʹ�õ�ǰϵͳ��·���ָ�����Unixϵͳ��"/"��Windowsϵͳ��"\"
3. �½�ģ��views/index.pug
д��:
```jade
doctype html
html(lang="en")
  head
  body
    h1 hello,#{name}
```
`#{name}`: ת��html��ǩ

`!{name}`: ��ת��html��ǩ

4. ģ�忪��
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

## MongoDB���ݿ�
1. ��װ
Windows��,���ذ�װ��,next,next,next...
2. ����
`mongod.exe --dbpath="F:\node\mongodb\blog"`
3. ����
`mongodb://admin:123456@localhost/`
4. �������

SQL =>MongoDB

database => database

table  =>collection

row    =>      document

column   =>  field

index =>    index

5. ��ʹ��

show dbs��ʾ���ݿ�

�������ݿ� 
```js
use nodejs-blog
db.createCollection('articles')
```
��Ӽ�¼:
```js
db.articles.insert({
  title:'One',
  author:'lonmar',
  body:'This is article One'
});
```
��ѯ:`db.articles.find();`

## node.js����&ʹ��MondoDB
ʹ��mongoose, �ĵ� https://mongoosejs.com/

��װ: `cnpm install mongoose --save`

����: `const mongoose = require('mongoose')`

����: `mongoose.connect('mongodb://localhost/dbName', {useNewUrlParser: true, useUnifiedTopology: true});`

�����¼�:
- `error` : db.on('error', console.error.bind(console, 'connection error:'));
- `open`: db.once('open', function() {
  // we're connected!
});

1. ����һ��collection:
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
2. ��ѯ����: `find()`
```js
Article.find({},function(err,articles){
      res.render('index',{
          title:'index',
          articles: articles
      })
  })
```
3. ��������
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
4. �޸�����
```js
Article.findById(req.params.id, function(err, article) {
  res.render('edit', {
    title: 'Edit Article',
    article: article //json
  })
})
```
5. ɾ������
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

## ����POST body-parser

Node.js body parsing middleware

��װ: `cnpm install body-parser --save`

�ֲ�: https://www.npmjs.com/package/body-parser

����: `var bodyParser = require('body-parser')`

```js
bodyParser.text([options]) //�����ı�
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

�Ծ�̬�ļ��Ĵ���:
```js
app.use(express.static(path.join(__dirname,'public')))
```
## bower

1. bower https://bower.io/ , ����js,css��

��װ cnpm install -g bower

2. ����: �����ļ�.bowerrc
```json
{
  "directory": "public/bower_components" //�ļ�����·��
}
```
3. ��װbootstrap
Git Bash�� `bower install bootstrap`, Ȼ������
```jade
link(rel="stylesheet",href="/bower_conponents/bootstrap/dist/css/bootstrap.css")
```
4. ��װjquery
Git Bash�� `bower install jquery`

## express-session
�ĵ�: https://github.com/expressjs/session

��װ: `cnpm install express-session --save`

easy to use
```js
...
var session = require('express-session')
...
// �м��
app.use(session({
    secret: 'secret-key', //dangerous!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
...
```

## flash
��װ `cnpm install express-messages connect-flash --save`

�ĵ� https://github.com/visionmedia/express-messages

�����������ӵ��м�����ּ���
```js
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
```
ʹ��: `req.flash('status','message')`
```js
router.get('/logout', function(req, res){
  req.logout()
  req.flash('success', 'You are logged out')
  res.redirect('/users/login')
})
```
ģ��: �ں���λ����� `!= messages('message', locals)` (only for jade/pug)

## ����֤ express-validator

express-validation��һ���м��,����֤�����body, params, query, headers �� cookies

https://express-validator.github.io/docs/

��װ `cnpm install express-validator --save`

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

��װ:

`cnpm install passport --save`

`cnpm install  passport-local --save`

Passport��Ŀ��һ������Nodejs����֤�м��.PassportĿ��ֻ��Ϊ��`��½��֤`,���,����ɾ�,��ά��,���Է���ؼ��ɵ�������Ӧ����

WebӦ��һ����2�ֵ�½��֤����ʽ,passport��֧��
- �û�����������֤��½
- OAuth��֤��½

�û�����������֤ʵ��:
1. passport������û����֤���ܵ�,��Ҫ����һ�����Բſ���ʹ��

���ز���: ����`passport-local`
```js
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        // ���ݿ��ѯ����user
        if (!user) { return done(null, false, { message: 'No User Found' }); }
        // ��֤����
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
2. ����

app.js

```js
const passport = require('passport')
require('./config').passport

//��ʼ��
app.use(passport.initialize())
app.use(passport.session())
/// ...
```
3. ʹ��:
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

1. authenticate����Է���req.user ָ����ǰ�û�.

2. ģ���л�ȡ��ǰ�û�:
```js
app.get('*',function(req,res,next){
    res.locals.user = req.user || null
    next()
})
```

## markdown֧��

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
Ч��һ��

### marked
`cnpm install marked --save`

Ч���ȽϺ�
```js
const marked = require('marked')

article.body=marked(article.body)
res.render('articles/show',{
    article:article,
    author:user.name
})
```