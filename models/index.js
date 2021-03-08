const rethinkdbdash = require('rethinkdbdash');
const r = rethinkdbdash({ db: DB_NAME, host: DB_HOST, port: DB_PORT });

module.exports = {
  getById: (table, id) => {
    return r
      .table(table)
      .get(id)
      .run();
  },
  getAll: (table) => {
    return r
      .table(table)
      .coerceTo('array')
      .run();
  },
  create: (table, data) => {
    return r
      .table(table)
      .insert(data)
      .run();
  },
  updateById: (table, id, data) => {
    return r
      .table(table)
      .get(id)
      .update(data)
      .run();
  },
  deleteById: (table, id) => {
    return r
      .table(table)
      .get(id)
      .delete()
      .run();
  },
}