import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Job, { foreignKey: 'client_id', as: 'jobs' });
  }
}

export default Client;
