const express = require("express")
const { Account } = require("../db")
const { userMiddleware } = require("../middleware/userMiddleware")
const { default: mongoose } = require("mongoose")
const router = express.Router()

router.get("/balance", userMiddleware, async(req, res) => {
    const userId = req.userId

    const account = await Account.findOne({
        userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", userMiddleware, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()

    const {amount, to} = req.body

    const account = await Account.findOne({userId: req.userId}).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
})

module.exports = router