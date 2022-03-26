import express from 'express'
import config from './config'
import authRoutes from './routes/auth.routes'
import morgan from 'morgan'

import sequelize from './database/db'
//const sequelize = require('./database/db');



const app = express();


//configs
app.set('port',config.PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);

app.listen(app.get('port'),(error)=>{
    if(error)
        console.log(error);
    else {
        
        console.log(`Escuchando en puerto ${app.get('port')}`);
        sequelize.sync({ force: true }).then(() => {
            console.log("Nos hemos conectado a la base de datos");
        }).catch(error => {
            console.log('Se ha producido un error', error);
        })
    }

});
