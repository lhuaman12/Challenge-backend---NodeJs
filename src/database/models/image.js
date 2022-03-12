const {DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('Image',{
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





