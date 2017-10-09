
exports.up = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.timestamps(false, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
};
