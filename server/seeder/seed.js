const db = require('../config/connection');
const { User, Category, Food, Category } = require('../models');
const { userSeeds, categorySeeds, foodSeeds } = require('./seeds/index.js')
const cleanDB = require('./cleanDB');

// cleanDB clear the records in the collections of the database
db.once('open', async () => {
  try {
    // cleandb = async (modelName, collectionName) =>{}
    await cleanDB('User', 'users');
    await cleanDB('Category', 'categories');
    await cleanDB('Food','foods')

    await User.create(userSeeds);
    await Category.create(categorySeeds);
  //  await Food.create(foodSeeds);

    for (let i = 0; i < foodSeeds.length; i++){
      const category = await Category.findOne({foodName:foodSeeds[i].foodName})
      const food = await Food.create(foodSeeds[i])
      const addCategoryToFood = await Food.findByIdAndUpdate({
        _id : food._id
      },{
        $addToSet:{
          category:{
            _id: category._id
          }
        }
      })
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

/*    
for (let i = 0; i < foodSeeds.length; i++) {
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