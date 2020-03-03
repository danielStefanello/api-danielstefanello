import Sequelize from 'sequelize';

import User from '../app/models/User';
import Client from '../app/models/Client';
import Tech from '../app/models/Tech';
import Category from '../app/models/Category';
import Job from '../app/models/Job';
import Image from '../app/models/Image';

import databaseConfig from '../config/database';

const models = [User, Client, Tech, Category, Job, Image];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
