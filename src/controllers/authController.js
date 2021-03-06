import sequelize from "../database/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from '../config'
import { sendEmail } from "../utils/emails";

const { Character, Image, Film, Serie, Genre, Rol, User } = sequelize.models;

export const loginController = async (req, res) => {
    
    const userFound = await User.findOne({
        where:{
            username: req.body.username
        }
    });
    
    console.log(userFound);
    
    if(!userFound){
        res.status(400).json({message:"username or password do not match"});
    }
    else {
        console.log(req.body.password);
        bcrypt.compare(req.body.password,userFound.password,(err,value)=>{
            if(err)
            console.error(err);
            
            else if(value==false)
            res.status(400).json({message:"username or password do not match"});

            else {
                const token = jwt.sign({id:userFound.id},config.SECRET_CODE,{
                  expiresIn: 86400 // 24 horas
                });
                res.status(200).json({
                    status: "Logged successfully",
                    token : token
                });
            }
            

        });
    }
};
// se registra una persona con el rol de usuario, en otros casos puede ser admin o moderator
export const signupController = async (req, res) => {
    const { username, password , email } = req.body;
    let checked = true;
  
    if (!username) {
      res.status(400).json({ message: "user field missing" });
      checked = false;
    }
    if (!password) {
      res.status(400).json({ message: "password field missing" });
      checked = false;
    }

    if(!email) { 
        res.status(400).json({ message: "email field missing" });
        checked = false;
    }
  
    if (checked) {
      const user = await User.findAll({
        where: {
          username: username,
        },
      });
  
      if (!user.length) {
        bcrypt.hash(password, 10, async (err, hash) => { // encriptamos el password para no tener en texto plano la contrasenia, le damos 10 rondas para hashear
          if (err) console.error(err);
          else {
            
            const userCreated = await User.create({
              username: username,
              password: hash,
              email:email
            });

            const userRol = await Rol.findOne({where:{name:'user'}});

            await userCreated.addRol(userRol);
  
            const token = jwt.sign({id:userCreated.id},config.SECRET_CODE,{
                expiresIn: 86400 // 24 horas
            })
            res.status(200).json({
                message: "Account registered succesfully",
                token : token
               });
            await sendEmail(email,"Bienvenido a disney API","Hola "+username+" bienvenido a la API de disney, ya puedes comenzar a usarla");
          }
        });
      } else {
        res.status(400).json({ message: "User already registered" });
      }
    }
  }
  
