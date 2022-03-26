export const associate = (sequelize) => {
  const { Character, Image, Film, Serie, Genre, Rol, User } = sequelize.models;

  Character.belongsTo(Image);
  //
  Film.belongsTo(Image);
  // Film x Character (many to many)
  Film.belongsToMany(Character, {
    through: {
      model: "film_character",
      unique: false,
    },
    foreignKey: "character_id",
    constraints: false,
  });
  Character.belongsToMany(Film, {
    through: {
      model: "film_character",
      unique: false,
    },
    foreignKey: "film_id",
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
  // Genre x film
  Film.belongsToMany(Genre, {
    through: {
      model: "film_genre",
      unique: false,
    },
    foreignKey: "film_id",
    constraints: false,
  });
  Genre.belongsToMany(Film, {
    through: {
      model: "film_genre",
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
