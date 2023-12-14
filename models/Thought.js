const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionType: {
        type: String,
        required: true,
    },
    replyToThought: {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
});

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            getter: true,
        },
        userName: {
            type: String,
            required: true,
        },
        thoughtReactions: [reactionSchema],
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;