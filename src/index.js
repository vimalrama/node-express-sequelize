import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import models from './models';
import routes from './routes';
import sqlite from 'sqlite3';
import Sequelize  from 'sequelize';
import { db } from './models/user'
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from  './swagger.json';

const app = express();

// const swaggerUi = swaggerUi();
// swaggerDocument = require('./swagger.json')

// const sequelize = new Sequelize('mainDB',null,null,{
//     dialect: "sqlite",
//     storage: './test.sqlite'
// })

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) {
//     console.log('Unable to connect to the database:', err);
//   })

//   const User = sequelize.define('user', {
//     // attributes
//     firstName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: Sequelize.STRING
//       // allowNull defaults to true
//     }
//   }, {
//     // options
//   });


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req,res,next)=>{
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/products',require('./routes/products'))

db.sync({ force: true }).then(() => {
    console.log("Database synchronized")
    app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });
