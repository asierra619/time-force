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
    await cleanDB('Food','foods')

    const user = await User.create(userSeeds);
    //console.log(user)
    await Category.create(categorySeeds);
   // await Food.create(foodSeeds);

    for (let i = 0; i < foodSeeds.length; i++){
      // console.log(foodSeeds[i])
      const category = await Category.findOne({categoryName:foodSeeds[i].categoryName})
      // console.log(category);
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
