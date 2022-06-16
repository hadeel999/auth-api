'use strict';

const clothesModel = (sequelize, DataTypes) => sequelize.define('clothes', {
  name: { type: DataTypes.STRING, required: true },
  color: { type: DataTypes.STRING, required: true },
  size: { type: DataTypes.STRING, required: true }
},{ 
    sequelize,
    tableName: 'clothes',
    timestamps: false,
    });

module.exports = clothesModel;