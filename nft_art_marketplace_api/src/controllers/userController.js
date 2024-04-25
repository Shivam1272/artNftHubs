// const sharp = require("sharp");
const Users = require("../models/userModel.js");
// const uploadUserProfile = async (req, res) => {
//   try {
//     const buffer = await sharp(req.file.buffer)
//       .resize({ height: 250, width: 250 })
//       .png()
//       .toBuffer();
//     req.user.photo = buffer;
//     await req.user.save();

//     res.status(200).json({
//       status: "success",
//       data: req.user,
//       message: "Profile image uploaded.",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(200).json({
//       status: "failure",
//       data: null,
//       message: "Failed to upload profile image!",
//     });
//   }
// };

// const getAllUsers = (req, res) => {
//   res.status(200).json({
//     status: "success",
//     result: nfts.length,
//     data: {
//       nfts,
//     },
//   });
// };

const getSingleUser = async (req, res) => {
  // console.log(req.params.id);
  const walletaddress = req.params.id;
  // console.log(walletaddress);
  if (!walletaddress) {
    return res.status(400).json({
      status: "UnSuccessFull",
      data: null,
    });
  }
  try {
    // console.log(walletaddress.toLowerCase());
    let user = await Users.findOne({
      walletaddress: walletaddress.toLowerCase(),
    });
    console.log(user, Date.now());
    if (user) {
      return res.status(200).json({
        status: "sucess",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        massage: "No User Found",
      });
    }
  } catch (error) {
    console.log("Error in getting the User");
    return res.status(500).json({
      status: "Server Error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { username, email, walletaddress, description } = req.body;
  // console.log(req.body, Date.now());
  if (!username || !email || !walletaddress || !description) {
    return res.status(400).json({
      status: "Failure",
      message: "Please provide all the required fields.",
    });
  }
  // Check for existing user with provided email address
  let existingUser = await Users.findOne({
    $or: [{ email }, { walletaddress }],
  });
  if (existingUser) {
    return res.status(403).json({
      status: "Failure",
      message: "Email or Wallet Address already in use.",
    });
  }
  const newUser = await Users.create({
    username,
    email,
    walletaddress,
    description,
  });
  if (!newUser) {
    return res.status(500).json({
      status: "Failure",
      message: "Error creating a new account.",
    });
  }
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
};

const updateUser = (req, res) => {
  const walletaddress = req.params.id;
  const updates = req.body;
  const allowedUpdates = ["username", "description", "email"];
  const isValidOperation = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({
      status: "Invalid Operation!",
      message: `The field ${Object.keys(updates)[0]} cannot be updated.`,
    });
  }
  // Checking user existence by the provided wallet address
  Users.findOne({ walletaddress }).then((user) => {
    if (!user) {
      return res.status(404).json({
        status: "User Not Found",
        message: `No user with wallet address "${walletaddress}" was found.`,
      });
    }
    const updateData = {};
    Object.entries(updates).forEach(([key, value]) => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = value;
      }
    });
    UserSchema.findByIdAndUpdate(user._id, updateData, {
      new: true,
    })
      .then((updatedUser) => {
        res.status(200).json({
          status: "Updated",
          data: updatedUser,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "Failed",
          message: err.message,
        });
      });
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  // getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // uploadUserProfile,
};
