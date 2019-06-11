'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
  
    User.associate = function(models) {
        // associations can be defined here
        User.belongsToMany(models.roles, { as: 'Roles', through: 'user_has_role', foreignKey: 'id_user', otherKey: 'id_role' });
    };

    // Hooks
    // Called beforeact create user
    User.beforeCreate(async user => {      
        // hash password
        user.password = await bcrypt.hash(user.password, 10)
    })
  
    return User;
};