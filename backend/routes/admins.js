const router = require('express').Router();
const { registerAdmin, auth } = require('../controllers/admins');

router.post('/register', registerAdmin);
router.post('/auth', auth);

module.exports = router;
