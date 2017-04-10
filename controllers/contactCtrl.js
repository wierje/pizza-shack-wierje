'use strict';

const Contact = require('../models/contactMdl');

module.exports.show = (req, res) => {
    res.render('contact', { page: 'Contact' });
};

module.exports.addContact = ({ body }, res, err) => {
    Contact.forge(body)
        .save()
        .then(() => res.redirect('/'))
        .catch(err);
};