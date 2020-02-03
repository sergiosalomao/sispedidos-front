import Api from '../Api';

export default class ClienteService extends Api {
  constructor() {
    super('/clientes');
  }
}
