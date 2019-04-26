import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import models from './models';
import routes from './routes';
import sqlite from 'sqlite3';
import Sequelize  from 'sequelize';
import { ApolloServer, gql } from "apollo-server-express";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { db } from './models/user'
import mongoose from 'mongoose'
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from  './swagger.json';

const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: { db }
  });

mongoose.connect('mongodb://admin:xgfTlh1wE3qje4wI@SG-first-20609.servers.mongodirector.com:48357,SG-first-20610.servers.mongodirector.com:48357,SG-first-20611.servers.mongodirector.com:48357/admin?replicaSet=RS-first-0&ssl=true');

const mongodb = mongoose.connection;

const app = express();
server.applyMiddleware({ app });

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
// app.use('/contacts',require('./routes/contact'))

db.sync({ force: true }).then(() => {
    console.log("Database synchronized")    
    app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });
