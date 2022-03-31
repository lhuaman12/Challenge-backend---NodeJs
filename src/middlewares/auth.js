 import jwt from 'jsonwebtoken';
 import sequelize from '../database/db';
 import config from '../config';

 const { User, Rol } = sequelize.models;

 export const isAuthenticated = (req, res, next) => {
    const token = req.headers['x-access-token']
    if(token){
        jwt.verify(token,config.SECRET_CODE, async (err,decoded)=>{
            if(err)
                res.status(401).json({status:"Invalid token"});
            else{
                const userFound = await User.findOne({where:{id:decoded.id},include:[{model:Rol,required:true}]});
                
                if(!userFound){
                    res.status(401).json({status:"User not found"});
                }
                else {if(userFound.Rols.some(rol => rol.name=="user")){
                    next();
                }}

            }
        });
    }
    else {
        res.status(401).json({status:"No token provided"});
    }
    
};