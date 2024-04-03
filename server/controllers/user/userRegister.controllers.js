import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { signUpBody } from "../../utils/index.js";
import { Account } from "../../models/account.models.js";
export const RegisterUser = async (req, res) => {
  try {
    const validate = signUpBody.safeParse(req.body);
    if (!validate.success) {
      return res.status(401).json({
        success: false,
        message: validate.error.issues[0].message,
      });
    }
    const { username, firstName, lastName, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists please login",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPwd,
      firstName,
      lastName,
    });
    const userId = user._id;
    await Account.create({
      user: userId,
      balance: 1 + Math.random() * 10000,
    });
    res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
