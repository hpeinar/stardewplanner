
exports.up = function (knex, Promise) {
  return knex.schema.createTable('render', (table) => {
    table.increments('id').primary();
    table.integer('farm_id').unsigned();
    table.string('render_url');
    table.string('layout');
    table.string('season');

    table.foreign('farm_id').references('farm.id').onUpdate('NO ACTION').onDelete('CASCADE');

    table.timestamps(false, true);
  }).then(() => {
    return knex.raw('INSERT INTO render (farm_id, render_url, layout, season) SELECT id, render_url, layout, season FROM farm WHERE farm.render_url IS NOT NULL')
  }).then(() => {
    // return knex.schema.table('farm', (table) => {
    //   table.dropColumn('renderUrl');
    // });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('farm', (table) => {
    table.string('render_url');
  }).then(() => {
    return knex.dropTable('render');
  });
};