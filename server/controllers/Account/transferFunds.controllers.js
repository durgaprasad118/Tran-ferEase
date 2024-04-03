import mongoose from "mongoose";
import { Account } from "../../models/account.models.js";
import { transferBody } from "../../utils/index.js";
const transferFunds = async (req, res) => {
  try {
    const validate = transferBody.safeParse(req.body);
    if (!validate.success) {
      return res.status(401).json({
        success: false,
        error: validate.error.issues[0].message,
      });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const userId = req.userId;
    const account = await Account.findOne({ user: userId }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "no sufficient balance",
      });
    }
    const toAcc = await Account.findOne({ user: to }).session(session);
    if (!toAcc) {
      await session.abortTransaction();
      res.status(400).json({
        success: false,
        message: "not a valid account",
      });
    }
    //PUT: request we can do this
    //deducting from my account
    // account.balance -= amount;
    // await account.save().session(session);
    // toAcc.balance += amount;
    // await toAcc.save().session(session);
    await Account.updateOne(
      {
        user: userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      },
    ).session(session);
    //crediting to  to: account
    await Account.updateOne(
      {
        user: to,
      },
      {
        $inc: {
          balance: amount,
        },
      },
    ).session(session);
    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "transaction successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
export { transferFunds };
