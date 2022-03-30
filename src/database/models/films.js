const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Film',{
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
        score : {
            type: DataTypes.INTEGER,
            allowNull:false,

        },
        creation_date : {
            type: DataTypes.DATE,
            allowNull:false,
        }
    });

}

