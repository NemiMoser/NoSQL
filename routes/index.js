const router = require('express').Router();
const thoughtsRoutes = require('./api/thoughtsRoutes');
const usersRoutes = require('./api/usersRoutes');

router.use('/api/thoughts', thoughtsRoutes);
router.use('/api/users', usersRoutes);

router.use((req, res) => res.send('Incorrect route!'));

module.exports = router;


//const apiRoutes = require('./api');
//router.use('/api', apiRoutes);
