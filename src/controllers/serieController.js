import sequelize from "../database/db";

const { Character, Image, Movie, Serie, Genre, Rol, User ,} = sequelize.models;


export const getAllMovies =  async (req, res) => {
  const { name, genre, order } = req.query;

  if (!name || !genre || !order) {
    const moviesFound = await Movie.findAll({
      include: [
        {
          model: Character,
          required: false,
        },
        {
            model:Genre,
            required:false
        }
      ],
    });
    if(moviesFound.length == 0)
        res.status(400).json({status:"No movies found"});
    else
        res.status(200).json(moviesFound);
  } 
  else {
    if (name) {
      const moviesFound = await Movie.findAll({
        where: {
          name: name,
        },
        include: [
          {
            model: Character,
            required: false
          },
          {
              model: Genre,
              required:false
          }
        ],
      });

    }
  }
};
