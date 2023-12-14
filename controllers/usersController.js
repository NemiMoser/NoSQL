const { User, Thought } = require('../models');

module.exports = {
    //get users
    async getUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUserFriends: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).populate('userFriends', 'userName');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user.userFriends);
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    },
};