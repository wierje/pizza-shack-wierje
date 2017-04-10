'use strict';

const { bookshelf } = require('../db/database');
const { compare } = require('bcryptjs');

const User = bookshelf.Model.extend({
    tableName: 'users',
    bcrypt: { field: 'password' },
    comparePass: function(passwordStr) {
        console.log('pw str from user', passwordStr);
        console.log('user', this.attributes);
        return compare(passwordStr, this.attributes.password)
    }
}, {
    findOneByEmail: function(email) {
        return this.forge({ email })
            .fetch()
            .then((user) => {
                console.log('Got user', user.get('email'));
                return user;
            })
            .catch(() => {
                console.log('no email');
                return (null)
            });
    }
});

module.exports = User