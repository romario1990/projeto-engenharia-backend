
import GenericDao from '../GenericDao';

export default class AlunosDao extends GenericDao {
  constructor(connection) {
    super(connection, 'alunos');
  }

  async listAlunos() {
    const sql = 'select 1,2,3';
    return this.connection.oneOrNone(sql);
  }
}
