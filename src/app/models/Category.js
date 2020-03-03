import Sequelize, { Model } from 'sequelize';

class Category extends Model {
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
    this.belongsToMany(models.Job, {
      foreignKey: 'category_id',
      through: 'job_categories',
      as: 'categories',
    });
  }
}

export default Category;
