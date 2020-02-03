import Api from '../Api';

export default class RegisterService extends Api {
  constructor() {
    super('/register');
  }
}
