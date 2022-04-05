export const associate = (sequelize) => {
  const { Character, Image, Movie, Serie, Genre, Rol, User } = sequelize.models;

  Character.belongsTo(Image);
  //
  Movie.belongsTo(Image);
  // Movie x Character (many to many)
  Movie.belongsToMany(Character, {
    through: {
      model: "movie_character",
      unique: false,
    },
    foreignKey: "character_id",
    constraints: false,
  });
  Character.belongsToMany(Movie, {
    through: {
      model: "movie_character",
      unique: false,
    },
    foreignKey: "movie_id",
    constraints: false,
  });
  // Serie x Character (many to many)
  Serie.belongsToMany(Character, {
    through: {
      model: "serie_character",
      unique: false,
    },
    foreignKey: "serie_id",
    constraints: false,
  });
  Character.belongsToMany(Serie, {
    through: {
      model: "serie_character",
      unique: false,
    },
    foreignKey: "character_id",
    constraints: false,
  });
  // Genre x serie
  Genre.belongsToMany(Serie, {
    through: {
      model: "genre_serie",
      unique: false,
    },
    foreignKey: "genre_id",
    constraints: false,
  });
  Serie.belongsToMany(Genre, {
    through: {
      model: "genre_serie",
      unique: false,
    },
    foreignKey: "serie_id",
    constraints: false,
  });
  // Genre x Movie
  Movie.belongsToMany(Genre, {
    through: {
      model: "movie_genre",
      unique: false,
    },
    foreignKey: "Movie_id",
    constraints: false,
  });
  Genre.belongsToMany(Movie, {
    through: {
      model: "movie_genre",
      unique: false,
    },
    foreignKey: "genre_id",
    constraints: false,
  });

  Genre.belongsTo(Image);
  // User x Rol
  User.belongsToMany(Rol, {
    through: {
      model: "user_rol",
      unique: false,
    },
    foreignKey: "user_id",
    constraints: false,
  });
  Rol.belongsToMany(User, {
    through: {
      model: "user_rol",
      unique: false,
    },
    foreignKey: "rol_id",
    constraints: false,
  });
};
