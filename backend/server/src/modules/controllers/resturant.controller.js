const restaurant = require("../../database/models/resturant.Model");
const { validationResult } = require("express-validator");
const meal = require("../../database/models/Meals_model");
const uploadImg = require('../../utils/uploadImg.js');
const rescomment = require("../../database/models/resComments_model");
const userModel = require("../../database/models/userModel.js");

const getResturantWithMeals = async (req, res) => {
    try {
        const { id } = req.params;
        const meals = await meal.find({ ResID: id });
        const RestaurantData = await restaurant.findOne({ _id: id });

        const restaurantComments = await rescomment.find({ ResID: id }).populate('user','name userImg -_id');
        res.status(200).json({ restaurant: RestaurantData, meals: meals,resComments: restaurantComments });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getAllresturant = async (req, res) => {
    try {
        const restaurants = await restaurant.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const addNewresturant = async (req, res) => { //{ResName, ResImg, Categoery,ResBanner,location} Remove validation of .png,add banner to database ,Upload image from request body
    try {
        console.log("Get all res started, body:", req.body)
        if (req.session.user.role != "ADMIN")
            return res.status(400).json({ errors: "Not Authenticated" });

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        //  const resImgUrl = await uploadImage(req.body.ResImg);
        //  const resBannerUrl = await uploadImage(req.body.ResBanner);

        const restaurantname = req.body.ResName;
        const restaurants = await restaurant.find({ ResName: restaurantname });
        if (!restaurants[0]) {
            const rating = 0;
            const Meals_num = 0;
            const comment_num = 0;
            console.log("Upload image here")
            const ResImg = await uploadImg(req.body.resImg);
            console.log("ResImg", ResImg)
            const ResBanner= await uploadImg(req.body.resBanner);
            console.log("ResBanner", ResBanner)
                try {
                    const newRestaurantData = {
                        ResName: req.body.ResName,
                        ResImg: ResImg, 
                        ResBanner: ResBanner, 
                        Categoery: req.body.Categoery,
                        location:req.body.location,
                        rating: rating,
                        comment_num: comment_num,
                        //creation_date: createdAt
                    };
                    const newRestaurant = await restaurant.create(newRestaurantData);
                    res.status(200).json(newRestaurantData);
                } catch (error) {
                    console.error('Error creating new restaurant:', error);
                    res.status(500).json({ error: 'Server error while adding new restaurant' });
                }

        } else {
            res.send("Restaurant already exists");
        }

    } catch (error) {
        console.log("Error in addNewresturant", error);
        res.status(500).json({ message: "Could not add restaurant" });
    }
}


const deleteresturant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurantToDelete = await restaurant.findOne({ _id: id });
        
        if (!restaurantToDelete) {
            return res.status(404).json({ message: "Restaurant Not Found" });
        }

        await meal.deleteMany({ ResID: id });
        await rescomment.deleteMany({ ResID: id });
        
        if (restaurantToDelete.ResImg && restaurantToDelete.ResImg.public_id) {
            await uploadImg.deleteImage(restaurantToDelete.ResImg.public_id);
        }
        if (restaurantToDelete.ResBanner && restaurantToDelete.ResBanner.public_id) {
            await uploadImg.deleteImage(restaurantToDelete.ResBanner.public_id);
        }

        await restaurant.findOneAndDelete({ _id: id });

        res.status(200).json({ message: "Restaurant Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const postRestaurantComment = async (req, res) => {
    try {
        res.status(200).json({ message: "ADDED COMMENT!" });
        console.log("Added comment!", `resID: ${req.body.resID} + Comment: ${req.body.comment}`);
    } catch (e) {
        console.log("Failed to post comment", e);
    }
}

const updateRestaurant = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "ADMIN") {
            return res.status(403).json({ error: "Not Authenticated" });
        }

        const { id } = req.params;
        const existingRestaurant = await restaurant.findById(id);

        if (!existingRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const updatedRestaurantData = {
            ResName: req.body.ResName || existingRestaurant.ResName,
            ResImg: req.body.ResImg || existingRestaurant.ResImg,
            ResBanner: req.body.ResBanner || existingRestaurant.ResBanner,
            location: req.body.location || existingRestaurant.location
        };

        const updatedRestaurant = await restaurant.findByIdAndUpdate(id, updatedRestaurantData, { new: true });

        if (!updatedRestaurant) {
            return res.status(404).json({ error: "Failed to update restaurant" });
        }

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ error: "Server error while updating restaurant" });
    }
};




module.exports = {
    getAllresturant,
    addNewresturant,
    deleteresturant,
    postRestaurantComment,
    getResturantWithMeals,
    updateRestaurant
};
