const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelize1', 'jose', '12345Seis', {
    host: 'localhost',
    dialect: 'mysql'
  })
Post = require('../models/post.js')(sequelize, Sequelize);
Author = require('../models/author.js')(sequelize, Sequelize);



router.get('/', (req, res) =>{
    res.render('index', {title: 'MI APP'});


})


router.get('/contact', (req, res) =>{
    res.render('contact',{title: 'MI CONTACT-APP'});


})

router.get('/card', (req, res) =>{
    res.render('card');


})

router.get( "/posts", (req, res) =>{
    
    Post.findAll().then( (result) => res.json(result))
        
});

router.get( "/postb", (req, res) =>{
    
    Post.findAll().then( (result) => {
    return result[2].authorId} ).then((result)=>

    Author.findByPk(result)).then( (result) => res.json(result))
    
    
});
router.get( "/postc", (req, res) =>{
    
   sequelize.query("select post.title,post.content,author.firstName  from post inner join author  on post.authorId=author.id").then( (datos) =>
       res.json(datos))
  
    
    
});

router.get( "/listado_posts", (req, res) =>{
    
    sequelize.query("select post.title,post.content,author.firstName  from post inner join author  on post.authorId=author.id").then( (results) =>
  {      res.render('post',{data: results});
         console.log(results);
        
 } )
   
     
     
 });

  router.get( "/post/:id", (req, res) =>
  
    Post.findByPk(req.params.id).then( (result) => res.json(result))
  );

  router.post("/post", (req, res) => 
   Post.create({
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId
    }).then( (result) => res.json(result) )
  );

  router.put( "/post/:id", (req, res) =>
    Post.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  router.delete( "/post/:id", (req, res) =>
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  router.get( "/author/:id", (req, res) =>
    Author.findByPk(req.params.id).then( (result) => res.json(result))
);
router.get( "/author", (req, res) =>
    Author.findAll().then( (result) => res.json(result))
);


module.exports =router;