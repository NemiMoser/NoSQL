const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought } = require('./data');

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

connection.once('open', async () => {
    console.log('connected to MongoDB');

    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
    
        const users = [];
        const thoughts = [];
    
        for (let i = 0; i < 10; i++) {
          const thoughtText = getRandomThought(); // Get random thought
          thoughts.push({ thoughtText }); // Store thought in an array
    
          const user = getRandomUser(); // Get random user
          users.push({
            userName: user.userName, // Access the userName property from the getRandomUser function
            userEmail: user.userEmail, // Access the userEmail property from the getRandomUser function
          });
        }

    // Insert users and thoughts into the database
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.info('Seeding is now complete');
    process.exit(0);
  } catch (error) {
    console.error('Error while seeding:', error);
    process.exit(1);
  }
});