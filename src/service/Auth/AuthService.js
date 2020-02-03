import Api from '../Api';

export default class AuthService extends Api {
  constructor() {
    super('/login');
  }
}
