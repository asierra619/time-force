const db = require('../config/connection');
const { User, Category, Food } = require('../models');
const { userSeeds, categorySeeds, foodSeeds } = require('./seeds/index.js')
const cleanDB = require('./cleanDB');

// cleanDB clear the records in the collections of the database
db.once('open', async () => {
  try {
    // cleandb = async (modelName, collectionName) =>{}
    await cleanDB('User', 'users');
    await cleanDB('Category', 'categories');
    await cleanDB('Food','food')

    await User.create(userSeeds);
    await Category.create(categorySeeds);
    await Food.create(foodSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

/*    
for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    for (let i = 0; i < foodSeeds.length; i++) {}
    
*/