'use strict';

module.exports.show = (req, res) => {
    res.render('about', { page: 'About' });
};