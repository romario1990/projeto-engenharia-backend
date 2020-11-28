import Dao from '../Dao';
import GenericDao from '../GenericDao';

export default class ConfigDao extends GenericDao {
  constructor(config) {
    super(Dao.connections.configuracao, config);
  }
}
