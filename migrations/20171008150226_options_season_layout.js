
exports.up = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.string('layout');
    table.string('season');
    table.json('options');
  }).then(() => {
    return knex.raw(`ALTER TABLE farm MODIFY options JSON;`);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.dropColumn('layout');
    table.dropColumn('season');
    table.dropColumn('options');
  });
};
