const User = require('../models/user');

//import crypto-js package for hashing the password before saving into the database
const CryptoJS = require("crypto-js");

module.exports.register = async (req, res) => {
    // console.log(req.body)
    // Sample response:
        // {
        //     firstName: 'Test 1',
        //     lastName: 'Test 1',
        //     email: 'test1@mail.com',
        //     password: '1234'
        // }

   try{
    const response = await User.findOne({email: req.body.email})
    // console.log(response)
    // sample response:
        // null or user object

    if(response != null){
        res.send({
            email_exists: 'User exists. Please login instead!'
        })
    }


    if(response == null){
         //encrypt the password before saving into the database
        const ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();

        //create a user object to to used to save in the database
        const userObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: ciphertext
    }

        const newUser = await User.create(userObject)
        // console.log(newUser)
        // sample response of Model.create() method from mongoose
            // {
            //     firstName: 'Test 1',
            //     lastName: 'Test 1',
            //     email: 'test1@mail.com',
            //     password: 'U2FsdGVkX184LZlkCLlUJe5Qx/IwHBzbl/xo3OwmaW0=',
            //     isAdmin: false,
            //     isActive: true,
            //     _id: new ObjectId("650f140614a3c300ba83de46"),
            //     createdAt: 2023-09-23T16:36:22.739Z,
            //     updatedAt: 2023-09-23T16:36:22.739Z,
            //     __v: 0
            // }


        // if the response is not the newly created user object, send back a message response
        if(!newUser){
            res.send({
                error: `Please try again!`
            })
        }

        // response to be sent back to the user
        res.send({
            data: newUser,
            message: `Registered successfully! You may now log in.`
        })
        }
   

   }catch(error){
    console.log({
        error: error.message
    })
   }
}

module.exports.login = async (req, res) => {

   try{
        const user = await User.findOne({email: req.body.email});
        // console.log(user)
        // Sample Response:
            // {
            //     _id: new ObjectId("650f155fd39c137085e74648"),
            //     firstName: 'Test 2',
            //     lastName: 'Test 2',
            //     email: 'test2@mail.com',
            //     password: 'U2FsdGVkX19oW9IkRLS1k2UUMAmJv0rAbWEqQbYim6Y=',
            //     isAdmin: false,
            //     isActive: true,
            //     createdAt: 2023-09-23T16:42:07.526Z,
            //     updatedAt: 2023-09-23T16:42:07.526Z,
            //     __v: 0
            // }

        if(!user){
            res.send({
                message: "User does not exists. Please register first!"
            })
        }

        res.send(user)


   }catch(error){
        console.log({
            error: error.message
        })
   }

    
}

module.exports.allUser = async (req, res) => {

    try {
        const users = await User.find();
        // console.log(users)
        // Sample Response:
            // [
            //     {
            //       _id: new ObjectId("650f140614a3c300ba83de46"),
            //       firstName: 'Test 1',
            //       lastName: 'Test 1',
            //       email: 'test1@mail.com',
            //       password: 'U2FsdGVkX184LZlkCLlUJe5Qx/IwHBzbl/xo3OwmaW0=',
            //       isAdmin: false,
            //       isActive: true,
            //       createdAt: 2023-09-23T16:36:22.739Z,
            //       updatedAt: 2023-09-23T16:36:22.739Z,
            //       __v: 0
            //     },
            //     {
            //       _id: new ObjectId("650f1a3fb1b50ee1a5aa0c2b"),
            //       firstName: 'Test 2',
            //       lastName: 'Test 2',
            //       email: 'test2@mail.com',
            //       password: 'U2FsdGVkX18aGxuyScTCQC/zFcKDMiblES1Sw+kWLI4=',
            //       isAdmin: false,
            //       isActive: true,
            //       createdAt: 2023-09-23T17:02:55.815Z,
            //       updatedAt: 2023-09-23T17:02:55.815Z,
            //       __v: 0
            //     }
            //   ]
    
        res.send({
            all_users: users
        })

    } catch (error) {
        console.log({error: error.message})
    }
}

module.exports.userById = async(req, res) => {
    // console.log(req.params.id)
    // Sample response:
        // 650f140614a3c300ba83de46
    
    const user = await User.findOne({_id: req.params.id})
    // console.log(user)
    // sample response: 
        // {
        //     _id: new ObjectId("650f140614a3c300ba83de46"),
        //     firstName: 'Test 1',
        //     lastName: 'Test 1',
        //     email: 'test1@mail.com',
        //     password: 'U2FsdGVkX184LZlkCLlUJe5Qx/IwHBzbl/xo3OwmaW0=',
        //     isAdmin: false,
        //     isActive: true,
        //     createdAt: 2023-09-23T16:36:22.739Z,
        //     updatedAt: 2023-09-23T16:36:22.739Z,
        //     __v: 0
        //   }

    res.send({data: user})
}

