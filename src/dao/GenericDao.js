function makeFilter(filter) {
  let queryFilter = ' 1=1 ';
  let values;
  if (filter) {
    queryFilter = filter.map((f, i) => `${f.key} ${f.op ? f.op : '='} $${i + 1}`).join(' AND ');
    values = filter.map(f => f.value || true);
  }
  return { queryFilter, values };
}
export default class GenericDao {
  /**
   *
   * @param {*} connection
   * @param {{table: string, schema: string}} config
   */
  constructor(connection, config) {
    this.connection = connection;
    if (config) {
      const { table, schema } = config;
      this.table = table;
      this.schema = schema;
    }
  }

  findAllOrderBy(fields = '*', fieldOrder = 1) {
    return this.connection.manyOrNone(`select ${fields} from ${this.schema}.${this.table} order by ${fieldOrder}`);
  }

  findAll(fields = '*') {
    return this.connection.manyOrNone(`select ${fields} from ${this.schema}.${this.table}`);
  }

  findById(id, fields = '*') {
    if (!id) return undefined;
    return this.connection.one(`select ${fields} from ${this.schema}.${this.table} where id = $1`, +id);
  }

  findByParameter(parameter, value, fields = '*') {
    return this.connection.oneOrNone(`select ${fields} from ${this.schema}.${this.table} where ${parameter} = $1`, value);
  }

  listByParameter(parameter, value, fields = '*') {
    return this.connection.manyOrNone(`select ${fields} from ${this.schema}.${this.table} where ${parameter} = $1`, value);
  }

  /**
   *
   * @param {integer} id identificador unico da entidade
   * @param {object} data Valores da tabela para atualizar
   *
   * @example update(5, { nome: 'teste' }) => UPDATE gm.bairro set nome = 'teste' where id = 5
   * @example update(5, { teste: 123 }, 'codigo') => UPDATE gm.bairro set teste = 123 where codigo = 5
   *
   */
  update(id, data, allowUndefined) {
    return this.updateByParameter('id', id, data, allowUndefined);
  }

  /**
   * @param {string} parameter columna a ser usada no where
   * @param {any} value valor a ser comparado no where para atualizar
   * @param {object} data Valores da tabela para atualizar
   *
   * @example update(5, { nome: 'teste' }) => UPDATE gm.bairro set nome = 'teste' where id = 5
   * @example update(5, { teste: 123 }, 'codigo') => UPDATE gm.bairro set teste = 123 where codigo = 5
   *
   */
  updateByParameter(parameter, value, data, allowUndefined = false) {
    let values = Object.keys(data);
    if (!allowUndefined) {
      values = values.filter(o => data[o] !== undefined);
    }
    values = values.map(o => `${o}=$[${o}]`).join(',');
    return this.connection.one(`UPDATE ${this.schema}.${this.table} SET ${values} where ${parameter} = ${value} returning * `, data);
  }

  /**
 *
 * @param {number} id identificador unico da entidade
 */
  remove(id) {
    return this.removeByParameter('id', id);
  }

  /**
   *
   * @param {string} parameter coluna a ser usada no where para deletar o redistro
   * @param {any} value valor a ser comparado no where
   * @example function('codigo', 1) => delete from gm.lograoudo where codigo = 1
   */
  removeByParameter(parameter, value) {
    const qry = `delete from ${this.schema}.${this.table} where ${parameter} = $1`;
    return this.connection.none(qry, value);
  }

  /**
 * Retorna todos os resultados encontrados com os dados informados
 *
 * @param {Object[]} [filter] objetos a serem adicionados do WHERE
 *
 * @returns {Object[]} resultado do query
 *
 * @example
 * list([{ key: 'id', op: '=', value: 18 }], 'id');
  */
  list(filter, fields = '*') {
    const { queryFilter, values } = makeFilter(filter);
    return this.connection.manyOrNone(`SELECT ${fields} FROM ${this.schema}.${this.table} WHERE ${queryFilter}`, values);
  }

  // TODO: melhorar usando insert do pg-promise - https://github.com/vitaly-t/pg-promise/wiki/Data-Imports
  insert(data, fields = 'id') {
    const keys = Object.keys(data).filter(o => data[o] !== undefined).join(',');
    const values = Object.keys(data).filter(o => data[o] !== undefined).map(k => (`$[${k}]`)).join(',');
    const sql = `INSERT INTO ${this.schema}.${this.table}(${keys}) VALUES(${values}) RETURNING ${fields}`;
    return this.connection.one(sql, data);
  }

  /**
   *
   * @param {*} data objeto com as chaves a ser inserido ou atualidado no banco
   * @param {array} conflictKeys array com as chaves para comparar os conflitos, quando der conflito é executado um update
   */
  // TODO: achar retorno melhor do que none
  upsert(data, conflictKeys = []) {
    const keys = Object.keys(data).filter(o => data[o] !== undefined).join(',');
    const values = Object.keys(data).filter(o => data[o] !== undefined).map(k => (`$[${k}]`)).join(',');
    const updateValues = Object.keys(data).filter(o => data[o] !== undefined).map(o => `${o}=$[${o}]`).join(',');
    console.log(`INSERT INTO ${this.schema}.${this.table}(${keys}) VALUES(${values}) ON CONFLICT (${conflictKeys.join(',')}) DO UPDATE SET ${updateValues}`);
    console.log(data);
    return this.connection.none(`INSERT INTO ${this.schema}.${this.table}(${keys}) VALUES(${values}) ON CONFLICT (${conflictKeys.join(',')}) DO UPDATE SET ${updateValues}`, data);
  }

  insertSt(idEntidade, geometry, srid) {
    const sql = `INSERT INTO ${this.schema}.st_${this.table} (the_geom, id_${this.table}) select st_transform(st_setsrid(st_geomFromGeoJson($1), 4326), $2) as the_geom, $3 as id_${this.table} returning id`;
    return this.connection.one(sql, [geometry, +srid, idEntidade]);
  }

  updateSt(idEntidade, geometry, srid) {
    const sql = `UPDATE ${this.schema}.st_${this.table} set the_geom = (st_transform(st_setsrid(st_geomFromGeoJson($1), 4326), $2)) where id_${this.table} = $3`;
    return this.connection.none(sql, [geometry, +srid, idEntidade]);
  }
}
