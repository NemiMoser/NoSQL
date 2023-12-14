const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.get('/', (req, res) => {
    res.send('API endpoint');
  });

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

//retrieve friends
router.get('/users/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('userFriends', 'userName');

    if(!user) {
      return res.status(404).json({ message: 'User not found'});
    }

    res.json(user.userFriends);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;