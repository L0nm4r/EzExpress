const { request } = require('express')
const express = require('express')
// const markdown = require('markdown').markdown
const marked = require('marked')


const router = express.Router()
const { check, validationResult } = require('express-validator')


let Article = require('../models/article')
const User = require('../models/user')
router.get('/new',ensureAuthenticated,function(req,res){
  res.render('articles/new')
})

router.get('/:id',function(req,res){
  Article.findById(req.params.id,function(err,article){
    User.findById(article.author, function(err,user){
        // article.body=markdown.toHTML(article.body)
        article.body=marked(article.body)
        res.render('articles/show',{
            article:article,
            author:user.name
        })
    })
  })
})

router.get('/:id/edit',ensureAuthenticated,function(req,res){
  Article.findById(req.params.id,function(err,article){
      if(article.author!=req.user._id){
          req.flash('danger','No Authenticated!')
          return res.redirect('/')
      }
      res.render('articles/edit',{
          title:'Edit article',
          article:article,
          author:req.user.name
      })
  })
})

router.post('/create',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('body').isLength({ min: 1 }).withMessage('Body is required'),
//   check('author').isLength({ min: 1 }).withMessage('Author is required'),
] ,function(req,res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      res.render('articles/new',{
          title:'Add article',
          errors: errors.array()
      })
  }else{
      let article = new Article(req.body)
      article.author = req.user.id
      article.save(function(err){
          if(err){
              console.log('[*]error!',err)
          }else{
              req.flash("success", "  Article Added Successfully");
              res.redirect('/')
          }
      })
  }
})

router.post('/update/:id',function(req,res){
  let query = { _id: req.params.id }
  // let article = new Article()
  article = {
    'title': req.body.title,
    'author': req.user._id,
    'body': req.body.body
  }
  Article.updateOne(query,article,function(err){
      if(err){
          console.log("[*]Update Error!")
          console.log(err)
      }else{
          req.flash('success','Update Success!')
          res.redirect('/')
      }
  })
})

router.delete('/:id',function(req,res){
  if(!req.user._id){
      return res.status(500).send()
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id,function(err,article){
    if(article.author!=req.user._id){
        return res.status(500).send()
    }
  })

  Article.remove(query,function(err){
      if(err){
          console.log("[*]Delete Wrong!")
      }else{
          req.flash('success','Delete Successfully!')
          res.send('ok')
      }
  })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
}

module.exports = router