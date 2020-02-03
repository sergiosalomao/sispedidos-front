import Api from '../Api';

export default class ProdutoService extends Api {
  constructor() {
    super('/produtos');
  }
}
