import Api from '../Api';

export default class CategoriaService extends Api {
  constructor() {
    super('/categorias');
  }
}
