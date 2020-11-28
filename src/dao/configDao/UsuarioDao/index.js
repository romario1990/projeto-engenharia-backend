import ConfigDao from '../ConfigDao';

export default class UsuarioDao extends ConfigDao {
  constructor() {
    super({
      table: 'usuario',
      schema: 'public',
    });
  }

  findUserByLogin(login) {
    return this.connection.oneOrNone(
      'select * from public.usuario u where u.login = $1 and u.ativo',
      login,
    );
  }
}
