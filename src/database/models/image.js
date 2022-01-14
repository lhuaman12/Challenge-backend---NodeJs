const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Image extends Model {}
Address.init({
    id:{
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoincrement:true,
     allowNull : false
        
    },
    path: {
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    sequelize,
    modelName: "image",
    timestamps: false
});

export default Image;


/*
export const ImageModel = (sequelize,DataTypes)=>{
    sequelize.define('character',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement:true,
            allowNull : false
            
        },
        path: {
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
}


*/
