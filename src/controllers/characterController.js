import sequelize from "../database/db";
import image from "../database/models/image";

const { Character, Image, Film, Serie, Genre, Rol, User ,} = sequelize.models;

export const getAllCharacters = async (req,res)=>{
    let charactersResponse = [];
    const {name,age,weight,film,serie} = req.query;
    let charactersFound;

    if(name || age || weight || film || serie){
        charactersFound = await Character.findAll({
            where: req.query,
            include: [{
                model: Image,
                required:true
            }]
        });
    }
    
    else {
        charactersFound = await Character.findAll({  // esto representa un join de characters con su imagen
            include: [{
                model: Image,
                required:true
            }]
        });
    }
    
    charactersFound.forEach( character => charactersResponse.push({
        id : character.id,
        name : character.name,
        //age: character.age,
        //weight : character.weight,
        image : character.ImageId,
        
    }));
    res.status(200).json(charactersResponse);
}

export const addCharacter = async (req,res) =>{
    const {age,name,weight ,path, films,series} = req.body; // el path corresponde a la ruta de la imagen personaje
    
    if(!age || !name || !weight || !path)
        res.status(400).json({status:"some fields missing, for ex: 'age':'16', 'name':'carlos', 'weigth':50.5, path:'http:domain.com/char.jpg'"})

    else {
        
        const newImage = await Image.create({path});
        const newCharacter = await Character.create({age,name,weight,ImageId:newImage.id});

        if(films){
            films.forEach(async film => {
                const filmFound = await Film.findOne({where:{id:film.id}});
                if(filmFound)
                    await filmFound.addCharacter(newCharacter);
            });
        }
        if(series){
            series.forEach(async serie => {
                const serieFound = await Serie.findOne({where:{id:serie.id}});
                if(serieFound)
                    await serieFound.addCharacter(newCharacter);
            });
        }
        
        res.status(200).json({status:"Character added successfully"});
    }

}
export const editCharacter = async (req,res) => {
    const characterId = req.params.id;
    const {age,name,weight ,path, films,series} = req.body; 
    if(!age && !name && !weight && !path && films && series)
        res.status(400).json({status:"some fields missing, for ex: 'age':'16', 'name':'carlos', 'weigth':50.5, path:'http:domain.com/char.jpg'"})
    else {
        const characterFound = await Character.update({age,name,weight,ImageId:path},{where:{id:characterId}});
        if(films){
            films.forEach(async film => {
                const filmFound = await Film.findOne({where:{id:film.id}});
                if(filmFound)
                    await filmFound.addCharacter(characterFound);
            });
        }
        if(series){
            series.forEach(async serie => {
                const serieFound = await Serie.findOne({where:{id:serie.id}});
                if(serieFound)
                   await serieFound.addCharacter(characterFound);
            });
        }
        res.status(200).json({status:"Character updated successfully"});
    }

}

export const deleteCharacter = async(req,res) => {
    const characterId = req.params.id;
    
    const rowsElimited =  await Character.destroy({where:{id:characterId}});
    
    if(rowsElimited)
        res.status(200).json({status:"Character deleted successfully"});
    else {
        res.status(400).json({status:"Character not found"});
    }

}

export const getCharacter = async (req,res) => {
    const characterId = req.params.id;
    if(characterId){
        const characterFound = await Character.findOne({
            where:{
                id:characterId
            },
            include: [{
                model: Image,
                required:false
            },
            {
                model:Film,
                required:false
            },
            {
                model:Serie,
                required:false
            }
        ]
        });
    }
    
    console.log(characterFound);
    if(!characterFound)
        res.status(400).json({status:"character not found"});
    else res.status(200).json(characterFound);
}