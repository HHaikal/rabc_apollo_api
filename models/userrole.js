'use strict';
module.exports = (sequelize, DataTypes) => {
    const userRole = sequelize.define('user_has_role', {
    id_user: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER
  }, {});
  userRole.associate = function(models) {
    // associations can be defined here
  };
  return userRole;
};