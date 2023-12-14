const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    userThoughts: [
        {
            type: Schema.Types.Mixed,
            ref: 'Thought',
        },
    ],
    userFriends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const User = model('User', userSchema);

module.exports = User;
