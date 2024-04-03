import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";
import { signInBody } from "../../utils/index.js";
export const LoginUser = async (req, res) => {
  try {
    const validate = signInBody.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.error.issues[0].message,
      });
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        message: "User doesn't exist please register",
        success: false,
      });
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordCompare) {
      return res.status(404).json({
        message: "password mismatch",
        success: false,
      });
    }
    const token = createToken({
      userId: existingUser._id,
    });
    res.status(200).json({
      message: "loggedin Successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
