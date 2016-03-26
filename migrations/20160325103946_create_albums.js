
exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', function(table){
    table.increments(); // ID column, increments automatically
    table.string('artist');
    table.string('name');
    table.string('genre');
    table.boolean('explicit');
  });
};

exports.down = function(knex, Promise) {
  
};
