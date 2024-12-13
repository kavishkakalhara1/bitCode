import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { signupSchema, signinSchema } from "../joi/validationSchemas.js";
import sanitizeHtml from "sanitize-html";



export const signup = async (req, res, next) => {
  
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  const {
    fullname,
    email,
    username,
    password,
    universityregistrationnumber,
    university

  } = req.body;

 

  if (
    !email ||
    !password ||
    !fullname ||
    !username ||
    !university ||
    !universityregistrationnumber
    
  ) {
    next(errorHandler(400, "All fields are required"));
  }

   // Sanitize input
   const sanitizedFullname = sanitizeHtml(fullname);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedUsername = sanitizeHtml(username);
    const sanitizedUniversityregistrationnumber = sanitizeHtml(universityregistrationnumber);
    const sanitizedUniversity = sanitizeHtml(university);
    const sanitizedPassword = sanitizeHtml(password);


  const hashedPassword = bcryptjs.hashSync(sanitizedPassword, 10);

  const newUser = new User({
    fullname:sanitizedFullname,
    email:sanitizedEmail,
    username:sanitizedUsername,
    password: hashedPassword,
    universityregistrationnumber:sanitizedUniversityregistrationnumber,
    university:sanitizedUniversity,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {

  
  const { emailOrUsername, password } = req.body;
  

  if (!emailOrUsername || !password || emailOrUsername === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  // Check if both fields are provided
  if (!emailOrUsername || !password || emailOrUsername === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find user by email or username
    const validUser = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    // Send response with token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


