import { SignupView } from '../models/User';
import DBService from './db';

class UserService {
  static createUser(user: SignupView) {
    console.log('mode', user);
    const sequelize = DBService.getSequelize();
    console.log('sequelize', sequelize.models);
    sequelize
      .model('User')
      .create({ name: user.username, password: user.password, type: 1 })
      .then((users: any) => {
        console.log('user', users);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  }

  static loginUser(username: string, password: string) {}
}

export default UserService;
