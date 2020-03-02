import Sequelize, { Model } from 'sequelize';

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        thumbnail: Sequelize.STRING,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
        techs: Sequelize.STRING,
        client: Sequelize.STRING,
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
    this.hasMany(models.Image, { foreignKey: 'job_id', as: 'images' });
  }
}

export default Job;
