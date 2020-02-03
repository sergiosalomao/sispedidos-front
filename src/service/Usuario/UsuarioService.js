import Api from '../Api';

export default class UsuarioService extends Api {
  constructor() {
    super('/usuarios');
  }
}
