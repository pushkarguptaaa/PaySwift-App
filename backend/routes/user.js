const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config")
const { userMiddleware } = require("../middleware/userMiddleware")
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

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    jwt.sign({userId}, JWT_SECRET, (err, token) => {
       if (err) {
           return res.status(500).json({ error: err.message })
           }

       res.status(200).json({
           message: "User created successfully",
           token: token
       })
   })

})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string().min(6)
})

router.post("/signin" , async (req, res) => {
    const {success} = signinBody.safeParse(req.body)

    if(!success) res.status(414).json({
        message: "Email already taken / Incorrect inputs"
    })

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        jwt.sign({
            userId: user._id}, JWT_SECRET, (err, token) => {
            if (err) {
                return res.status(500).json({ error: err.message })
                }

            res.status(200).json({
                token: token
            })
        })
    }
    else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    
})

const updatedBody = zod.object({
    firstName: zod.string().optional(),
    password: zod.string().min(6).optional(),
    lastName: zod.string().optional()
})

router.put("/", userMiddleware, async (req, res) => {
    const {success} = updatedBody.safeParse(req.body)
    if(!success)
        res.status(411).json({
            message: "Error while updating information"
        })

    try{
        await User.updateOne({
            _id: req.userId
        },req.body)
    } 
    catch(e){
        res.json({e})
    }
    

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", userMiddleware, async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        },{
            lastName: {
                $regex: filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router