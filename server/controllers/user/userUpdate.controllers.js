import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";
export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, currentPassword, newPassword } = req.body;
    const existingUserDetails = await User.findById(userId);
    if (!existingUserDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (newPassword) {
      if (!currentPassword) {
        return res.status(401).json({
          success: false,
          message: " current password is required to change new Password",
        });
      }
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        existingUserDetails.password,
      );
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid current password",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      existingUserDetails.password = hashedNewPassword;
      await existingUserDetails.save();
    }

    if (firstName) {
      existingUserDetails.firstName = firstName;
    }

    if (lastName) {
      existingUserDetails.lastName = lastName;
    }

    await existingUserDetails.save();
    const token = createToken({
      userId,
    });
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      token: token,
      user: existingUserDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
