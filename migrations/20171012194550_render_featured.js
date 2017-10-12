
exports.up = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.boolean('featured');
    table.datetime('featuredAt');
    table.integer('views');

    table.index('featured');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.dropColumn('featured');
    table.dropColumn('featuredAt');
  });
};
