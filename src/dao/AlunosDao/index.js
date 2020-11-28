
import GenericDao from '../GenericDao';

export default class AlunosDao extends GenericDao {
  constructor(connection) {
    super(connection, 'alunos');
  }

  async listAlunos() {
    const sql = 'select * from quiz.aluno';
    return this.connection.oneOrNone(sql);
  }
}
