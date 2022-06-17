'use strict';
require("dotenv").config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "any word";


const usersModel = (sequelize, DataTypes) => sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user','writer','editor','admin'),
        defaultValue: 'user',
      },
      token: {
        type: DataTypes.VIRTUAL,
        get() {return jwt.sign({ username: this.username }, SECRET);
      }
      },
      actions:{
        type: DataTypes.VIRTUAL,
        get() {
            const acl ={
                user: ['read'],
                writer: ['read','create'],
                editor: ['read','create','update'],
                admin: ['read','create','update','delete']
            }
            return acl[this.role];
        }
      }      
},{ 
    sequelize,
    tableName: 'users',
    timestamps: false,
    });
    
module.exports = usersModel;