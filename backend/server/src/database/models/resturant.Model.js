const mongoose = require("mongoose");

const resturantSchema=mongoose.Schema({
    ResName:{
        type:String,
        require:[true,"Enter resturant name "]
    },
    ResImg:{
        type:String,
        require:[true,"Enter resturant ResImg"]
    },
    Categoery:{
        type:String,
        require:[true,"Enter resturant Categoery"]
    },
    rating:{
        type:Number,
        require:[true,"Enter resturant rating"]
    },
    comment_num:{
        type:Number,
        require:[true,"Enter resturant rating"]
    }
})

module.exports = mongoose.model("restaurant", resturantSchema);