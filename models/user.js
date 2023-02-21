module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        fullName: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        timestamps: false
    });

    User.associate = function(models) {
        User.hasMany(models.Adoption);
        User.belongsTo(models.Role);
    };

    return User;
};