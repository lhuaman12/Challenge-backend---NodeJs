import config from '../config'
import { associate } from './asociations';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'desafio_disney',
    config.DB_USER,
    config.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mariadb',
        port: config.DB_PORT
    }
);

const modelDefiners = [
	require ('./models/character'),
	require ('./models/image'),
    require ('./models/movie'),
    require ('./models/serie'),
    require('./models/genre'),
    require('./models/user'),
    require('./models/rol')
];

//console.log(modelDefiners[0]);


for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}


// associations of models
associate(sequelize);


export default sequelize;
