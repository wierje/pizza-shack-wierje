'use strict';

exports.up = (knex, Promise) => {
        return knex.schema.createTable('users', (table) => {
            table.increments();
            table.string('email').notNullable();
            table.string('password').notNullable();
        });

        exports.down = (knex, Promise) => exports.down = (knex, Promise) => knex.schema.dropTable('users')