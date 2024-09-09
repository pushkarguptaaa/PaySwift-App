const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User } = require("../db")
const { JWT_SECRET } = require("../config")
const router = express.Router()

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string().min(6)
})

router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body)
    if(!success) res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })

    const existing = await User.findOne({
        username: req.body.username
    })

    if(existing) res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})

router.post("/signin" , async (req, res) => {
    const {success} = signupBody.safeParse(req.body)

    if(!success) res.status(414).json({
        message: "Email already taken / Incorrect inputs"
    })

    const user = User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.status(200).json({
            token: token
        })

        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router