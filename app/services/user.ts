import crypto from 'crypto';
import { LoginView, SignupView } from '../models/User';
import DBService from './db';

class UserService {
  static createUser(user: SignupView) {
    const sequelize = DBService.getSequelize();
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return sequelize
      .model('User')
      .create({ name: user.username, password, type: 1, salt });
  }

  static loginUser(user: LoginView) {
    const { password, username } = user;
    const sequelize = DBService.getSequelize();
    return new Promise((resolve, reject) => {
      sequelize
        .model('User')
        .findOne({ where: { name: username } })
        .then(user => {
          console.log('user', password, user.get('password'));
          const hash = crypto
            .pbkdf2Sync(password, user.get('salt'), 1000, 64, `sha512`)
            .toString(`hex`);
          resolve(user.get('password') === hash);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

export default UserService;
