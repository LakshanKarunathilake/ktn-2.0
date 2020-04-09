const { remote } = require('electron');

class DBService {
  static getSequelize() {
    return remote.getGlobal('sharedObject').sequelize;
  }
}

export default DBService;
