import Sequelize, { Model } from 'sequelize';

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.hasMany(models.Image, { foreignKey: 'job_id', as: 'images' });
    this.belongsToMany(models.Tech, {
      foreignKey: 'job_id',
      through: 'job_techs',
      as: 'techs',
    });
    this.belongsToMany(models.Category, {
      foreignKey: 'job_id',
      through: 'job_categories',
      as: 'categories',
    });
  }
}

export default Job;
