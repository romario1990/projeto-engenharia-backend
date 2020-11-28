import ConfigDao from '../ConfigDao';

export default class ConfiguracaoDao extends ConfigDao {
  constructor() {
    super({
      table: 'configuracao',
      schema: 'public',
    });
  }

  isCadastroIndividualizado(id) {
    return this.connection.oneOrNone(
      'select cadastro_individualizado from public.configuracao where id = $1',
      id,
    );
  }
}
