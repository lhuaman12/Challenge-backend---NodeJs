const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Serie',{
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
        calificacion : {
            type: DataTypes.INTEGER,
            allowNull:false,

        },
        fecha_de_creacion : {
            type: DataTypes.DATE,
            allowNull:false,
        }
    });

}

