'use strict';

const foodModel = (sequelize, DataTypes) => sequelize.define('food', {
  name: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.FLOAT, required: true },
  type: { type: DataTypes.ENUM('fruit', 'vegetable', 'protein'), required: true }
},{ 
    sequelize,
    tableName: 'food',
    timestamps: false,
    });

module.exports = foodModel;