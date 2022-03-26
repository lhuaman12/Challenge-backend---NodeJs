const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('User',{
        /*
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoincrement:true,
            allowNull : false
        },
        */
        username :{
            type : DataTypes.STRING,
            allowNull:false

        },
        password : {
            type: DataTypes.STRING,
            allowNull:false,

        },
    
    });

}

