import Api from '../Api';

export default class FabricanteService extends Api {
  constructor() {
    super('/fabricantes');
  }
}
