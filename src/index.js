import express from 'express'

const app = express();


app.listen('3000',(error)=>{
    if(error)
        console.log('error')
    else 
        console.log('Escuchando')

})
