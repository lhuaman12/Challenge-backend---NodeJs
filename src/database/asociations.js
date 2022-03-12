export const associate = (sequelize) =>{
    
    const {Character,Image} = sequelize.models;
    
    //
    Character.hasOne(Image);
    Image.belongsTo(Character);
}

