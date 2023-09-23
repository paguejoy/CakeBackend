const cake = require('../models/cake');
const Cake = require('../models/cake');


module.exports.create = async (req, res) => {
    try{
        const cake = await Cake.findOne({title: req.body.title})
        console.log(cake)
        // sample response:
            // null or cake object
    
        if(cake != null){
            res.send({
                title_exists: 'Cake already exists. Please use another name!'
            })
        }

        if(cake == null){
    
            //create a cake object to used to save in the database
            const cakeObject = {
                title: req.body.title,
                description: req.body.description,
                difficulty: req.body.difficulty,
                portion: req.body.portion,
                time: req.body.time,
                type: req.body.type,
                cuisine: req.body.cuisine,
                category: req.body.category,
                ingredients: req.body.ingredients,
                method: req.body.method
            }
    
            // save cake to the database
            const newCake = await Cake.create(cakeObject)
    

            // if the response is not the newly created cake object, send back a message response
            if(!newCake){
                res.send({
                    error: `Please try again!`
                })
            }
    
            // official response to be sent back to the user
            res.send({
                data: newCake,
                message: `Created successfully!`
            })
        }    
    
       }catch(error){
        console.log({
            error: error.message
        })
       }
}

module.exports.allCake = async (req, res) => {
    try {

        const cakes = await Cake.find();
        res.send({
            "all_cake": cakes
        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.allActiveCake = async (req, res) => {
    try {

        const cakes = await Cake.find();
        // console.log(cakes)
        
        //for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log(limit)

        const startIndex = (page - 1) * limit;
        const lastIndex = (page) * limit;

        //initiate an object to be sent back to the user as a response
        const cakesResult = {};

        //adding new field to cakesResult object using dot notation
        cakesResult.Total_Cakes = cakes.length;
        cakesResult.Total_Page_Count = Math.ceil(cakes.length / limit);

        //condition to determine whether to add "next page" or "previous page"
        if(lastIndex < cakes.length){
            //adding new field to cakesResult object using dot notation
            cakesResult.next = {
                //plus 1 to determine that there's a next page available
                "page": page + 1
            }
        }

        if(startIndex > 0){
            cakesResult.previous = {
                //minus 1 to determine that there's a previous page available
                "page": page - 1
            }
        }

        //return only the desired number of responses using array slice method
        const totalResult = cakes.slice(startIndex, lastIndex);
        cakesResult.Cake_Documents = totalResult;

        res.send(cakesResult)

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.allInactiveCake = async (req, res) => {
    try {

        const cakes = await Cake.find({isActive: false});

        res.send({
            "all_inactive_cakes": cakes
        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.cakeByCategory = async (req, res) => {
    try {

        const cakes = await Cake.find({category: { $in : [req.body.category] }});

        //for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log(limit)

        const startIndex = (page - 1) * limit;
        const lastIndex = (page) * limit;

         //initiate an object to be sent back to the user as a response
         const cakesResult = {};

         //adding new field to cakesResult object using dot notation
         cakesResult.Total_Cakes = cakes.length;
         cakesResult.Total_Page_Count = Math.ceil(cakes.length / limit);
 
         //condition to determine whether to add "next page" or "previous page"
         if(lastIndex < cakes.length){
             //adding new field to cakesResult object using dot notation
             cakesResult.next = {
                 //plus 1 to determine that there's a next page available
                 "page": page + 1
             }
         }
 
         if(startIndex > 0){
             cakesResult.previous = {
                 //minus 1 to determine that there's a previous page available
                 "page": page - 1
             }
         }
 
         //return only the desired number of responses using array slice method
         const totalResult = cakes.slice(startIndex, lastIndex);
         cakesResult.Cake_Documents = totalResult;
 
         res.send(cakesResult)

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.cakeById = async (req, res) => {
   try {
        const cake = await Cake.findById({_id: req.params.id});
        // console.log(cake)

        res.send({
            "cake_by_id": cake
        })

   } catch (error) {
        console.log(error.message)
   }
}

module.exports.updateCakeImage = async (req, res) => {
    try {
        const cakeUpdate = await Cake.findByIdAndUpdate({_id: req.params.id}, {image: req.body.image}, {new: true})

        res.send({
            "image_updated": cakeUpdate
        })


    } catch (error) {
        console.log(error.message)
    }
}

module.exports.cakeActive = async (req, res) => {
    try {
        const cakeUpdate = await Cake.findByIdAndUpdate({_id: req.params.id}, {isActive: true}, {new: true})

        res.send({
            "isActive_true": cakeUpdate
        })


    } catch (error) {
        console.log(error.message)
    }
}

module.exports.cakeInactive = async (req, res) => {
    try {
        const cakeUpdate = await Cake.findByIdAndUpdate({_id: req.params.id}, {isActive: false}, {new: true})

        res.send({
            "isActive_true": cakeUpdate
        })


    } catch (error) {
        console.log(error.message)
    }
}

module.exports.cakeDelete = async (req, res) => {
    try {

        const cake = await Cake.findByIdAndDelete({_id: req.params.id})

        res.send({
            "deleted_cake": cake
        })   

    } catch (error) {
        console.log(error.message)
    }
}