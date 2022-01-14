import config from '../config'

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'desafio_disney',
    config.DB_USER,
    config.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mariadb'
    }
);

export default sequelize;
/*
import { Sequelize } from 'sequelize'
import config from '../config';
import { CharacterModel } from './models/character';
import { ImageModel } from './models/image';

const sequelize = new Sequelize(`mariadb://${config.DB_USER}:${config.DB_PASSWORD}@localhost:${config.DB_PORT}/desafio_disney`);
const Character = CharacterModel(sequelize,Sequelize.DataTypes);
const Image = ImageModel(sequelize,Sequelize.DataTypes);

Character.hasOne(Image);
Image.belongsTo(Character);


sequelize.sync({force:true}).then(()=>{
    console.log("Sincronizado con la DB");
})

export default {
    Character,Image
}


try {
        await sequelize.authenticate()
        console.log('Conexion a la DB exitosa');
    }
    catch(error){
        console.error('No se puede conectar a la DB: ',error);
    }
    */



