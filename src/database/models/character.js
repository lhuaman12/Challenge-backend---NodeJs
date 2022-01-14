const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}
Character.init({
    id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoincrement:true,
        allowNull : false
    },
    nombre :{
        type : DataTypes.STRING,
        allowNull:false

    },
    edad : {
        type: DataTypes.INTEGER,
        allowNull:false,

    },
    peso : {
        type: DataTypes.DECIMAL(6,3),
        allowNull:false,
    }
}, {
    sequelize,
    modelName: "character",
    timestamps: false
});

export default Character;

/*
export const CharacterModel = (sequelize,DataTypes)=>{

    return sequelize.define('character',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoincrement:true,
            allowNull : false
        },
        nombre :{
            type : DataTypes.STRING,
            allowNull:false

        },
        edad : {
            type: DataTypes.INTEGER,
            allowNull:false,

        },
        peso : {
            type: DataTypes.DECIMAL(6,3),
            allowNull:false,
        }
    });


}
*/


