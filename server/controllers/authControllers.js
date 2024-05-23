const User = require("../models/user.js");
const Owner = require("../models/owner.js");
const Member = require("../models/member.js");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");

// this function is responsible for choosing between the owner and member models based on the role of the user
const getUserModel = (role) => {
  return role === "owner" ? Owner : Member;
};

// Register user controller function
// this function is responsible for registering a new user in the database with checking if the user already exists or not and hashing the password before saving it in the database
// it takes the request and response objects as parameters and returns a response object
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, fonction } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const Model = getUserModel(role);
    const existingUsername = await Model.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const exist = await Model.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await Model.create({
      username,
      email,
      password: hashedPassword,
      role,
      fonction,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error while registering user", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login user controller function
// this function is responsible for logging in a user by checking the email and password and generating a token for the user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    if (!password)
      return res.status(400).json({ error: "Password is required" });

    const user =
      (await Member.findOne({ email })) || (await Owner.findOne({ email }));

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(400).json({ error: "Invalid password match" });
    // Generate token
    jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        fonction: user.fonction,
        members: user.members,
      },
      process.env.JWT_SECRET,
      {},
      async (err, token) => {
        if (err) {
          console.error("Error signing token", err);
          return res.status(500).json({ error: "Error in token generation" });
        }

        if (user.role === "owner") {
          let members = [];
          if (user.members && user.members.length > 0) {
            // Retrieve and include members when available
            const foundMembers = await Member.find({
              _id: { $in: user.members },
            });
            members = foundMembers;
          }

          res
            .cookie("token", token, { httpOnly: true })
            .json({ token, user, members });
        } else {
          res.cookie("token", token, { httpOnly: true }).json({ token, user });
        }
      }
    );
  } catch (error) {
    console.error("Error while logging in user", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Test controller function
// this function is responsible for testing the authentication of the user by checking the token
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    return res.status(400).json({ error: "User not authenticated" });
  }
};

// Logout controller function
// this function is responsible for logging out the user by clearing the token
const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
module.exports = { registerUser, loginUser, getProfile, logout };
