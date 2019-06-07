
module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define('author', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING
      },
      {
        freezeTableName: true,
      }
    );
  
    Author.associate = (models) => {
      Author.hasMany(models.post);
    };
  
    return Author;
  }