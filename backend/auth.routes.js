import { Router } from "express";
import { Login, Signup } from "./user.controller.js";
import authMiddleware from "./middleware.js";

const router = Router()

router.post('/login', Login)

router.post('/signup', Signup)

router.get('/', authMiddleware,(req,res)=>{
    res.json({
        message: "Authenticated user",
        userId: req.userId,
    })
})

export default router;
