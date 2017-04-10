'use strict';

const { bookshelf } = require('../db/database');

const Contact = bookshelf.Model.extend({
    tableName: 'contacts'
});

module.exports = Contact