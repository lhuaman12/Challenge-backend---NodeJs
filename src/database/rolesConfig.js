
export const generateRoles = async (sequelize) => {
    const Rol = sequelize.models.Rol
    const roles = await Rol.findAll();

    if(roles.length == 0){
        const user = await Rol.create({ // si no tiene roles en la base datos creamos uno por defecto
            name: 'user'
        });
    
    }

}