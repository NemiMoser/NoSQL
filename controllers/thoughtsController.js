const { User, Thought } = require('../models');

module.exports = {
    //get thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a thought
    async createThought(req, res) {
        try {
            const thoughts = await Thought.create(req.body);
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            return res.status(200).json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    //update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    //get reactions
    getReaction: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('thoughtReactions', 'userName');

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought.thoughtReactions);
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    },

    //post reactions
    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            const newReaction = {
                reactionType: req.body.reactionType,
                replyToThought: req.body.replyToThought,
            };

            thought.thoughtReactions.push(newReaction);
            await thought.save();

            res.status(201).json(newReaction);
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    },

    //delete reactions
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;
            const thought = await Thought.findById(thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            const reactionIndex = thought.thoughtReactions.findIndex((reaction) => reaction._id.toString() === reactionId
            );

            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'Reaction not found' });
            }

            thought.thoughtReactions.splice(reactionIndex, 1);

            await thought.save();

            res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    },
};