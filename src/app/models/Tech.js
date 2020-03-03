import Sequelize, { Model } from 'sequelize';

class Tech extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'techs',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Job, {
      foreignKey: 'tech_id',
      through: 'job_techs',
      as: 'jobs',
    });
  }
}

export default Tech;
