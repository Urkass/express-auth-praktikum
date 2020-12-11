const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

const JWT_SECRET = 'super-secret-token';

const getJwtToken = (id) => jwt.sign({ id }, JWT_SECRET);

const isAuthorized = (token) => {
    return jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            return false;
        }
        return Admin.findOne({ _id: decoded.id }).then((admin) => {
            return Boolean(admin);
        });
    });
};

module.exports = {
    getJwtToken,
    isAuthorized,
};
