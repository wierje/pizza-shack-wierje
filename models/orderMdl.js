'use strict';


const { bookshelf } = require('../db/database');

const Order = bookshelf.Model.extend({
    tableName: 'orders'
});

module.exports = Order;