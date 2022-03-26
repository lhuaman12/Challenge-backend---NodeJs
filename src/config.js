import {config} from 'dotenv';

// trae las variables de entorno
config();

export default {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    SECRET_CODE: process.env.SECRET_CODE
    
  };