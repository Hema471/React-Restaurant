const { validationResult } = require("express-validator");
const myusers = require("../../database/models/userModel");
const bcrypt =require('bcrypt');
const generateToken = require("../../utils/GenerateToken.js");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await myusers.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await myusers.create({ name, email, password: hashedPassword });
    return res.json({ msg: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await myusers.findOne({ email });
    if (!user) {
      return res.json({ msg: "User with this email does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      let token=generateToken({name:user.name,role:user.role,userId:user._id})
      return res.json({ msg: `Welcome ${user.name}`, role: user.role, token });
    } else {
      return res.json({ msg: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {signup,signin};

// Get
// const getSingleuser = async (req, res) => {
//   try {
//     const errors =validationResult(req)
//     if(!errors.isEmpty()){
//       res.status(400).json(errors.array()[0].msg)
//     }else{
//       // console.log(errors)
//       const Email = req.body.Email;
//       const password = req.body.password;
//       const myuser = await myusers.find({Email:Email});
//       // console.log(myuser[0].password)
//       if (!myuser[0]) {
//         res.status(201).send("user Not Found");
//       } else if(myuser[0].password!==password) {
//         res.status(201).send("wrong password");
        
//       }else{
//         console.log(myuser)
//         res.status(201).json({role:myuser[0].role,username:myuser[0].username});
//       }
//     }

//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// };

// // Post
// const addNewuser = async (req, res) => {
//   try {
//     const errors =validationResult(req)
//     if(!errors.isEmpty()){
//       res.status(400).json(errors.array()[0].msg)
//     }else{
//     const Email = req.body.Email;
//     const myuser = await myusers.find({Email:Email});
//     if (!myuser[0]) {
//       // console.log(req.body)
//       req.body.role='USER'
//       // console.log(req.body)
//       const newuser = new myusers(req.body);
//       await newuser.save();
//       console.log(newuser)
//       res.status(201).json({role:newuser.role,username:newuser.username});
//     } else {
//       res.send("USER EXEST");
//     }
//   }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// };
// module.exports = {
//   getSingleuser,
//   addNewuser,
// };
