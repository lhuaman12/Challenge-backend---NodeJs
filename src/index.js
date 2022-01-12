import express from 'express'
import config from './config'
import {connectDB} from './database/db'
import authRoutes from './routes/auth.routes'
import morgan from 'morgan'

const app = express();

//settings
connectDB();
app.use(morgan('dev'));
app.set('port',config.PORT);


//routes
app.use('/',authRoutes);

app.listen(app.get('port'),(error)=>{
    if(error)
        console.log(error);
    else 
        console.log(`Escuchando en puerto ${app.get('port')}`);

});
