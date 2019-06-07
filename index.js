const express = require('express');
const app = express();
const path = require('path');
const indexRoute= require('./routes/index');
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const sequelize = new Sequelize('sequelize1', 'jose', '12345Seis', {
    host: 'localhost',
    dialect: 'mysql'
  })

//define
Post = require('./models/post.js')(sequelize, Sequelize);
Author = require('./models/author.js')(sequelize, Sequelize);
//settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.use(indexRoute);
//app.use(require('./routes/index'))

//middlewares


//static files

app.use(express.static('public'));

sequelize.sync().then(() => {
    // populate author table with dummy data
    Author.bulkCreate(
      times(10, () => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      }))
    );
    // populate post table with dummy data
    Post.bulkCreate(
      times(10, () => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authorId: random(1, 10)
      }))
    );
   
    
  });
  app.listen(8080, () => console.log("App listening on port 8080!"));

