import UsuarioDao from '../../dao/configDao/UsuarioDao';
import ConfigDao from '../../dao/configDao/ConfiguracaoDao';

async function validaLogin(login, senha, senhaBase) {
  console.log('🚀 ~ file: index.js ~ line 5 ~ validaLogin ~ login, senha, senhaBase', login, senha, senhaBase);
  return { login: true }; // TO_DO alterar retorno
}
export default class LoginController {
  constructor() {
    this.usuarioDao = new UsuarioDao();
    this.configDao = new ConfigDao();
  }

  async login(_login, senha) {
    const user = await this.usuarioDao.findUserByLogin(_login);
    try {
      return await validaLogin(_login, senha, user.senha);
    } catch (e) {
      return e;
    }
  }
}
