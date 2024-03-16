const restaurant = require("../../database/models/resturant.Model");
const { validationResult } = require("express-validator");
const meal = require("../../database/models/Meals_model");
const uploadImage = require('../../utils/uploadImg.js');

const getResturantWithMeals = async (req, res) => {
    try {
        const { id } = req.params;
        const meals = await meal.find({ ResID: id });
        const RestaurantData = await restaurant.findOne({ _id: id });

        res.status(200).json({ restaurant: RestaurantData, meals: meals });
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

const addNewresturant = async (req, res) => { //{ResName, ResImg, Categoery}
    try {
        if (req.session.user.role == "user")
            return res.status(400).json({ errors: "Not Authenticated" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const restaurantname = req.body.ResName;
        const restaurants = await restaurant.find({ ResName: restaurantname });
        if (!restaurants[0]) {
            const rating = 0;
            const Meals_num = 0;
            const comment_num = 0;

            uploadImage(req, res, async () => {
                try {
                    const newRestaurantData = {
                        ResName: req.body.ResName,
                        ResImg: req.imageURL, 
                        Categoery: req.body.Categoery,
                        rating: rating,
                        comment_num: comment_num,
                        
                        creation_date: Date.now()
                    };
                    const newRestaurant = await restaurant.create(newRestaurantData);
                    res.status(200).json(newRestaurantData);
                } catch (error) {
                    console.error('Error creating new restaurant:', error);
                    res.status(500).json({ error: 'Server error while adding new restaurant' });
                }
            });
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
        const restaurants = await restaurant.findByIdAndDelete(id);
        if (!restaurants) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const postRestaurantComment = async (req, res) => {
    try {
        res.status(200).json({ message: "ADDED COMMENT!" });
        console.log("Added comment!", `resID: ${req.body.resID} + Comment: ${req.body.comment}`);
    } catch (e) {
        console.log("Failed to post comment", e);
    }
}

module.exports = {
    getAllresturant,
    addNewresturant,
    deleteresturant,
    postRestaurantComment,
    getResturantWithMeals
};