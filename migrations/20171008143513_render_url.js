
exports.up = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.string('render_url');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.dropColumn('render_url');
  });
};
