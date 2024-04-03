import { User } from "../../models/user.models.js";
export const userList = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: new RegExp(filter, "i"),
          },
        },
        {
          lastName: {
            $regex: new RegExp(filter, "i"),
          },
        },
      ],
    });
    res.status(200).json({
      success: true,
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
