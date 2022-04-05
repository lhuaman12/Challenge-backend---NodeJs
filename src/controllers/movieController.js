import sequelize from "../database/db"

const {Movie,Image} = sequelize.models;

const possibleQueries = ["name","genre","order"];
const parameters = ["creation_date","name","score"];

export const getAllMovies = async (req, res) => {
    let error = false;
    let moviesFound;

    if(! (Object.keys(req.query).length === 0)){
        let queries = {};
        let orderBy = "";
        for(const key in req.query){
            console.log(key,req.query[key]);
            if(possibleQueries.some(query => query === key)){ //validacion de que los queries esten en el listado de posibles queries
                if(key === "order" &&  (req.query[key] === "ASC" || req.query[key] === "DESC")){
                    orderBy = req.query[key];
                }
                else 
                    queries[key] = req.query[key]; //aqui se guardan los queries en un objeto
            }
            else {
                res.status(400).json({"message":"Invalid query"});
                error=true;
                break;
            }
        }
        
        if(!error){
            if(orderBy != ""){
                moviesFound = await Movie.findAll({
                    where: queries,
                    include: [{
                        model: Image,
                        required:false
                    }],
                    order: [["creation_date",orderBy]]
                });
            }
            else {
                console.log(queries);
                moviesFound = await Movie.findAll({
                    where: queries,
                    include: [{
                        model: Image,
                        required:false,
                    }],
                });
            }
            res.status(200).json(moviesFound);
        }
    }
        
    else  {
         moviesFound = await Movie.findAll({
            include: [{
            model: Image,
            required:false
            }]
        });
            
            res.status(200).json(moviesFound);   
        }

}

export const addMovie = async (req, res) => { //TODO: se tendria que normalizar el nombre de la pelicula
    const {name,score,creation_date} = req.body;
    let errorFlag = false;

    if(!req.body || !name || !score || !creation_date){
        res.status(400).json({message:"Missing parameters"});
        errorFlag=true;
    }

    if(!errorFlag){
        for(const key in req.body){
            if(!parameters.some(parameter => parameter === key)){ //validacion de que los queries esten en el listado de posibles queries
                res.status(400).json({message:"Invalid parameters"});
                errorFlag=true;
                break;
            }
        }
        if(!errorFlag){
            const date = new Date(creation_date);
            console.log(date);
            try{
            const newMovie = await Movie.create({
                name,
                score,
                creation_date:date
            });
            }
            catch(error){
                console.error(error);
                errorFlag=true;
                res.status(400).json({message:"Something went wrong check date format YYYY-MM-DD"});
            }
            
            if(!errorFlag){
                res.status(200).json({message:"Movie added successfully"});
            }
        }
    }
}

export const editMovie = async (req, res) => {
    let error = false;
    
    if(!req.body || !req.params.id)
        res.status(400).json({message:"Missing parameters"});    
    else {
        for(const key in req.body){
            if(!parameters.some(parameter => parameter === key)){ 
                res.status(400).json({message:"Invalid parameters"});
                error=true;
                break;
            }
        }
        if(!error){
            const movie = await Movie.update(req.body,{where:{id:req.params.id}});
            res.status(200).json({message:"Movie updated"});
        }
    }    
}

export const deleteMovie = async (req, res) => {
    if(req.params.id){
        const movie = await Movie.destroy({where:{id:req.params.id}});
        res.status(200).json({message:"Movie deleted"});
    }
    else {
        res.status(400).json({message:"Missing movie id for delete"});
    }
}

export const getMovie = async (req, res) => {
    if(req.params.id){
        const movie = await Movie.findOne({where:{id:req.params.id}});
        res.status(200).json(movie);
    }
    else {
        res.status(400).json({message:"Missing movie id"});
    }
}