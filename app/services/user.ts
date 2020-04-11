import crypto from 'crypto';
import { SignupView } from '../models/User';
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

  static loginUser(username: string, password: string) {}
}

export default UserService;
