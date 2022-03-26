import { Router } from "express";
import sequelize from "../database/db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from '../config'

const { Character, Image, Film, Serie, Genre, Rol, User } = sequelize.models;

const router = Router();

router.post("/login", (req, res) => {
  res.send("ok");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  let checked = true;

  if (!username) {
    res.status(400).json({ error: "user field missing" });
    checked = false;
  }
  if (!password) {
    res.status(400).json({ error: "password field missing" });
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
            password: hash
          });
          
          const token = jwt.sign({id:userCreated.id},config.SECRET_CODE,{
              expiresIn: 86400 // 24 horas
          })
          res.json({
              status: "Account registered succesfully",
              token : token
             });
        }
      });
    } else {
      res.json({ status: "User already registered" });
    }
  }
});

export default router;
