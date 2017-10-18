
exports.up = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.datetime('featured_at');
    table.dropColumn('featuredAt');
  }).then(() => {
    return knex.schema.table('render', (table) => {
      table.datetime('useful_at');
      table.datetime('popular_at')
    });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.dropColumn('featured_at');
    table.datetime('featuredAt');
  }).then(() => {
    knex.schema.table('render', (table) => {
      table.dropColumn('useful_at');
      table.dropColumn('popular_at');
    });
  });
};
