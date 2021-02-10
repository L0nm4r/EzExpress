## ���
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
֮��npm start����������Ŀ

5. debugģʽ
cnpm install nodemon --save-dev (��ʾ��������)
Ȼ���޸�start�����ű�Ϊnodemon app


## ģ������Pug/Jade
��Դ��Ŀ��ַ :https://github.com/pugjs/pug
�ֲ�: https://pugjs.org/api/getting-started.html
����:ʹ�����������ǩ
1. ��װ:cnpm install pug --save
2. �޸�app.js
```js
const path = require('path')
const app = express()
//ģ���й�����
app.set('views',path.join(__dirname,'views')) // ģ��·��
app.set('view engine','pug') //ģ������
```
path:Node.jsģ��, �ṩ��һЩ���ڴ����ļ�·����С����
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
SQL+-------------+MongoDB
database          database
table             collection
row               document
column            field
index             index
5. ��ʹ��
show dbs��ʾ���ݿ�
�������ݿ�
use nodejs-blog
db.createCollection('articles')
��Ӽ�¼:
db.articles.insert({
  title:'One',
  author:'lonmar',
  body:'This is article One'
});
��ѯ:
db.articles.find();

## node.js����&ʹ��MondoDB
ʹ��mongoose, �ĵ� https://mongoosejs.com/
��װ: cnpm install mongoose --save
����: const mongoose = require('mongoose')
����: mongoose.connect('mongodb://localhost/dbName', {useNewUrlParser: true, useUnifiedTopology: true});
�����¼�:
- error : db.on('error', console.error.bind(console, 'connection error:'));
- open: db.once('open', function() {
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
    article: article
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

## bower
�Ծ�̬�ļ��Ĵ���:
```js
app.use(express.static(path.join(__dirname,'public')))
```
1. bower https://bower.io/
����js,css��
��װ cnpm install -g bower
2. ����
�����ļ�.bowerrc
```json
{
  "directory": "public/bower_components"
}
```
3. ��װbootstrap
Git Bash�� `bower install bootstrap`
Ȼ������
```jade
link(rel="stylesheet",href="/bower_conponents/bootstrap/dist/css/bootstrap.css")
```
4. ��װjquery
Git Bash�� `bower install jquery`

## express-session
�ĵ�: https://github.com/expressjs/session
��װ: `cnpm install express-session --save`
���� `var session = require('express-session')`
����м��:
```js
app.use(session({
    secret: 'secret-key', //dangerous!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
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

## ����֤ express-validator
https://express-validator.github.io/docs/

��װ cnpm install express-validator --save



## bcrypt
cnpm install bcrypt --save
https://www.npmjs.com/package/bcrypt


## Passport
https://github.com/jaredhanson/passport
http://www.passportjs.org/docs/
cnpm install passport --save
cnpm install  passport-local --save



## markdown֧��
cnpm install markdown --save