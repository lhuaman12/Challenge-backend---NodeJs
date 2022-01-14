//import Sequelize from 'sequelize';
import { Character } from "./models/character"; 
import { Image } from "./models/image";

//One to one
Character.hasOne(Image);
Image.belongsTo(Character);

