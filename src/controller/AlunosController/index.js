import AlunosDao from '../../dao/AlunosDao';
import BaseController from '../BaseController';

export default class AlunosController extends BaseController {
  constructor(connection, usuario) {
    super(connection, usuario);
    this.dao = new AlunosDao(connection);
  }

  async listAlunos() {
    return this.dao.listAlunos();
  }
}
