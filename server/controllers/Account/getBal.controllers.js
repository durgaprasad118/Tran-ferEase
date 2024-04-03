import { Account } from "../../models/account.models.js";
import { User } from "../../models/user.models.js";
export const getBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ user: userId });
    if (!account) {
      return res.status(400).json({
        message: "User doesn't exist please register",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
