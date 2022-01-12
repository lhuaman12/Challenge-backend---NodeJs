import { Sequelize } from 'sequelize'
import config from '../config';


export const connectDB = async() =>{
    const sequelize = new Sequelize(`mariadb://${config.DB_USER}:${config.DB_PASSWORD}@localhost:${config.DB_PORT}/desafio_disney`);
    
    try {
        await sequelize.authenticate()
        console.log('Conexion a la DB exitosa');
    }
    catch(error){
        console.error('No se puede conectar a la DB: ',error);
    }
}


//mysql://localhost:30306/rescate_de_patitas