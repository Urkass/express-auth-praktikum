const Admin = require('../models/admin');
const { getJwtToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const registerAdmin = (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).send({ message: 'Data is invalid' });
    }
    Admin.findOne({ email })
        .then((admin) => {
            if (admin) {
                return res.status(409).send({ message: 'User is already exist' });
            }
            return bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
                return Admin.create({ password: hash, email })
                    .then((admin) => res.send(admin)) // { message: `User with ${admin.email} succesfully created` }))
                    .catch((err) => res.status(400).send(err));
            });
        })
        .catch((err) => res.status(400).send(err));
};

const auth = (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).send({ message: 'Data is invalid' });
    }
    Admin.findOne({ email })
        .then((admin) => {
            if (!admin) {
                return res.status(401).send({ message: 'Такого пользщователя не существует или пароль неверный' });
            }
            bcrypt.compare(password, admin.password).then((matched) => {
                if (!matched) {
                    return res.status(401).send({ message: 'Такого пользщователя не существует или пароль неверный' });
                }
                const token = getJwtToken(admin.id);
                return res.status(200).send({ token });
            });
        })
        .catch((err) => res.status(400).send(err));
};

module.exports = {
    registerAdmin,
    auth,
};
