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
        name :{
            type : DataTypes.STRING,
            allowNull:false

        },
        age : {
            type: DataTypes.INTEGER,
            allowNull:false,

        },
        weight : {
            type: DataTypes.DECIMAL(6,3),
            allowNull:false,
        }
    });

}

