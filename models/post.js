
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: Sequelize.STRING,
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        authorId: Sequelize.INTEGER
      },
      {
        freezeTableName: true,
      }
    );
  
    Post.associate = (models) => {
      Post.belongsTo(models.author);
    };
  
    return Post;
  }