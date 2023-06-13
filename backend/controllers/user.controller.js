const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { validationResult, check } = require("express-validator");

const signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate request data
  await check("name", "Name is required").notEmpty().run(req);

  await check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email")
    .run(req);

  await check("password", "Password is required")
    .notEmpty()
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    )
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const verificationToken = createVerificationToken(user);
    const verificationUrl = `http://localhost:3000/verification`;

    const message = `
    <!DOCTYPE html>
<html>
<head>
  <title>Email Template</title>
  <style>
    body {
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }

    h1 {
      color: #333;
      margin-bottom: 20px;
    }

    .container {
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      padding: 40px;
    }

    p {
      color: #777;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 20px;
    }

    .button {
      background-color: #7289da;
      border-radius: 3px;
      color: #fff;
      display: inline-block;
      font-size: 16px;
      line-height: 40px;
      padding: 0 20px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #5275b6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Drug Help!</h1>
    <p>Hey <strong>${name}</strong>,</p>
    <p>Thanks for registering an account with us!</p>
    <p>
      Before we get started, we'll need to verify your email.
    </p>
    <p>
      Please click the button below to verify your email address:
    </p>
    <p>
      <a class="button" href="${verificationUrl}/${verificationToken}">Verify Email</a>
    </p>
  </div>
</body>
</html>
`;

    try {
      await sendMail({
        email: user.email,
        subject: "Verify your account",
        message,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to verify your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create verification token
const createVerificationToken = (user) => {
  return jwt.sign(user, process.env.VERIFICATION_SECRET, {
    expiresIn: "5m",
  });
};

// user verification
const verification = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.body;

    const newUser = jwt.verify(token, process.env.VERIFICATION_SECRET);

    if (!newUser) return next(new ErrorHandler("Invalid token", 400));

    const { name, email, password } = newUser;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 400));

    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// login user
const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please provide all fields!", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Incorrect credentials", 400));

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return next(new ErrorHandler("Incorrect Credentials", 400));

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// load user
const getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return next(new ErrorHandler("User doesn't exists", 400));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user info
const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return next(new ErrorHandler("Incorrect password", 400));

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user password
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(
      req.body.currentPassword
    );

    if (!isPasswordMatched)
      return next(new ErrorHandler("Old password is incorrect!", 400));

    if (req.body.newPassword !== req.body.confirmPassword)
      return next(
        new ErrorHandler("Passwords doesn't matched with each other!", 400)
      );

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user addresses
const updateAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete user address
const deleteAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },

      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// log out user
const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  signup,
  verification,
  login,
  getUser,
  updateUser,
  updatePassword,
  updateAddress,
  deleteAddress,
  deleteAddress,
  logout,
};
