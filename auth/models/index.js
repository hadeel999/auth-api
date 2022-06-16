'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const foodModel=require("./food");
const clothesModel=require("./clothes");
const usersModel=require("./usersModel");
const Collection=require("./data-collection");

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = usersModel(sequelize,DataTypes);


module.exports = {
    sequelize:sequelize,
    DataTypes:DataTypes,
    food: new Collection(food),
    clothes: new Collection(clothes),
    users: users,
}; 