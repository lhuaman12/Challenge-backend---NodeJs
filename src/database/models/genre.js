const {DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('Genre',{
        /*
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement:true,
            allowNull : false
            
        },
        */
        nombre: {
            type:DataTypes.STRING,
            allowNull:false,
        }
    });
}
