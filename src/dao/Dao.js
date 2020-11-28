import promise from 'bluebird';
import pgPromise from 'pg-promise';
import { dbConfig } from '../config';

const initOptions = {
  promiseLib: promise,
};

export const pgp = pgPromise(initOptions);

pgp.pg.types.setTypeParser(20, parseInt);

const db = pgp(dbConfig);

async function init() {
  async function connect() {
    try {
      const obj = await db.connect().timeout(2000);
      obj.done();
    } catch (e) {
      return [db, e.message];
    }

    return [db, 'OK'];
  }

  const database = await connect();

  return database[0];
}

export default class Dao {
  static async config() {
    Dao.connections = await init();
    return Dao.connections;
  }

  static getUserConnection() {
    return Dao.connections;
  }
}

Dao.connections = [];
Dao.defaultConnection = undefined;
