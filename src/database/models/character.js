const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Character',{
        /*
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoincrement:true,
            allowNull : false
        },
        */
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

