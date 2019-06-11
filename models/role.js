'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('roles', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
      role.belongsToMany(models.users, { as: 'Users', through: 'user_has_role', foreignKey: 'id_role', otherKey: 'id_user' });
  };

  role.prototype.checkRole = async role => {
      console.log(typeof role)
    //   new Promise((resolve, reject) => {
          
    //   })
  }

  return role;
};