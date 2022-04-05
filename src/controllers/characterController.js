import sequelize from "../database/db";
import image from "../database/models/image";

const { Character, Image, Movie, Serie, Genre, Rol, User ,} = sequelize.models;

const possibleQueries = ["name","age","weight","movie","serie"];

export const getAllCharacters = async (req,res)=>{
    let charactersResponse = [];
    let charactersFound;
    let error = false;

    if(req.query){
        let queries = {};
        for(const key in req.query){
            if(possibleQueries.some(query => query === key)){ //validacion de que los queries esten en el listado de posibles queries
                queries[key] = req.query[key];
            }
            else {
                res.status(400).json({"message":"Invalid query"});
                error=true;
            }
        }
        
        if(!error){
            charactersFound = await Character.findAll({
                where: queries,
                include: [{
                    model: Image,
                    required:true
                }]
            });
        }
    }
    
    else {
        charactersFound = await Character.findAll({  // esto representa un join de characters con su imagen
            include: [{
                model: Image,
                required:true
            }]
        });
    }

    if(!error){
        charactersFound.forEach( character => charactersResponse.push({
            id : character.id,
            name : character.name,
            //age: character.age,
            //weight : character.weight,
            image : character.ImageId,
            
        }));
        res.status(200).json(charactersResponse);
    }
}

export const addCharacter = async (req,res) =>{
    const {age,name,weight ,path,movies,series} = req.body; // el path corresponde a la ruta de la imagen personaje
    
    if(!age || !name || !weight || !path)
        res.status(400).json({status:"some fields missing, for ex: 'age':'16', 'name':'carlos', 'weigth':50.5, path:'http:domain.com/char.jpg'"})

    else {
        
        const newImage = await Image.create({path});
        const newCharacter = await Character.create({age,name,weight,ImageId:newImage.id});

        if(movies){
            movies.forEach(async movie => {
                const movieFound = await Movie.findOne({where:{id:movie.id}});
                if(movieFound)
                    await movieFound.addCharacter(newCharacter);
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
    const {age,name,weight ,path, movies,series} = req.body; 
    if(!age && !name && !weight && !path && movies && series)
        res.status(400).json({status:"some fields missing, for ex: 'age':'16', 'name':'carlos', 'weigth':50.5, path:'http:domain.com/char.jpg'"})
    else {
        const characterFound = await Character.update({age,name,weight,ImageId:path},{where:{id:characterId}});
        if(movies){
            movies.forEach(async film => {
                const movieFound = await Film.findOne({where:{id:film.id}});
                if(movieFound)
                    await movieFound.addCharacter(characterFound);
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
    
    const rowsEliminated =  await Character.destroy({where:{id:characterId}});
    
    if(rowsEliminated)
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
                model:Movie,
                required:false
            },
            {
                model:Serie,
                required:false
            }
        ]
        });
        if(!characterFound)
            res.status(400).json({status:"character not found"});
        else
            res.status(200).json(characterFound);

    }
    else {
        res.status(400).json({message:"No character id provided"});
    }
    
    //console.log(characterFound);
}