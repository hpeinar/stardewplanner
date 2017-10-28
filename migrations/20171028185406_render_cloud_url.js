
exports.up = function (knex, Promise) {
  return knex.schema.table('render', (table) => {
    table.string('original_url');
  }).then(() => {
    return knex.raw('UPDATE render SET original_url = render_url WHERE render_url IS NOT NULL;');
  });
};

exports.down = function (knex, Promise) {
  return knex.raw('UPDATE render SET render_url = original_url WHERE original_url IS NOT NULL;')
    .then(() => {
      return knex.schema.table('render', (table) => {
        table.dropColumn('original_url');
      });
    });
};
