const userNames = [
    'nemiMoser',
    'codyMichael',
    'vicBuelna',
    'woodyMo',
    'sydneyChevy',
];

const userEmails = [
    'nemibmo@gmail.com',
    'codymos@gmail.com',
    'vicbue@gmail.com',
    'woodymoser@gmail.com',
    'sydchev@gmail.com',
]

const getRandomThought = () => {
    const thoughts = [
    'What a cool app!',
    'Ready for the holidays.',
    'Sushi for dinner',
    'Looking for snacks.',
    'Christmas music is playing.',
    ];
    return thoughts[Math.floor(Math.random() * thoughts.length)];
};

//get random user name
let counter = 1;

const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * userNames.length);
    const uniqueId = counter++;
    return {
      userName: `${userNames[randomIndex]}${uniqueId}`,
      userEmail: `${userEmails}${uniqueId}`,
    };
  };

module.exports = { getRandomThought, getRandomUser };

//userEmail: userEmails[randomIndex],
//const getRandomUser = () => {
//    const randomIndex = Math.floor(Math.random() * userNames.length);
//    return {
//        userName: userNames[randomIndex],
//        userEmail: userEmails[randomIndex],
//    };
//};