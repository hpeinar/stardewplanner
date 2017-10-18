
exports.up = function (knex, Promise) {
  return knex.schema.table('render', (table) => {
      table.datetime('useful_at');
      table.datetime('popular_at')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('render', (table) => {
      table.dropColumn('useful_at');
      table.dropColumn('popular_at');
  });
};
