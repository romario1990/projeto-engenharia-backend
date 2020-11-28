
export default class BaseDAO {
  constructor(connection, nameTable) {
    this.nameTable = nameTable;
    this.connectBase = connection;
  }
}
