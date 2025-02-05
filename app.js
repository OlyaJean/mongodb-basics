const mongoose = require('mongoose');

MYKEY = process.env.MONGODB;
mongoose.connect(`mongodb+srv://olgalavida:${MYKEY}.eviw0.mongodb.net/`).then(()=>console.log("database is connected")).catch(()=>console.error('Error'));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});

//user model

const User = mongoose.model('User', userSchema);

async function runQueryExamples(){
    try{

        //create a new doc
     const newUser = await User.create({
          name: "Updated User",
           email: 'updated@gmail.com',
            age: '523',
        isActive: true,
          tags: ['mechanic'],
        });
      console.log('User is created', newUser);

       // const allUsers = await User.find({});
       // console.log(allUsers);

       //const userFalseActive = await User.findOne({isActive : true});
       //console.log(userFalseActive)


      // const latestCreatedUserById = await User.findById(newUser._id);
      // console.log(latestCreatedUserById);

      //to get specific data
     // const selectedFields = await User.find().select('name email -_id');
      //console.log(selectedFields);

      //to get 3 users and skip first 2
     //const limitedUsers = await User.find().limit(3).skip(2);
      //console.log(limitedUsers);

      //to sort by age
     // const ageGroup = await User.find().sort({age: 1});
     // console.log(ageGroup);

     //to count specific inputs
    // const numberOfAvtive = await User.countDocuments({isActive: true});
    // console.log(numberOfAvtive);

    //find and delete an user
    //const deletedUser = await User.findOneAndDelete({name: 'Travis Mill'});
    //console.log(deletedUser);

    //find by Id and update
    const updatedUser = await User.findByIdAndUpdate(newUser._id,{
        $set:{age: 100},
        $push:{tags: 'plumber'}
    },
{new:true});
    console.log(updatedUser);

    }catch(error){
        console.log("error ->", error)
    }finally{
        await mongoose.connection.close()
    }
};
runQueryExamples();