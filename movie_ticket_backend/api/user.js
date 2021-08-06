const express = require("express")
const router = express.Router()
const userService = require("../service/authentication")

router.post("/login", async (req,res) => {
    const user = await userService.login(req.body.username, req.body.password);
    res.json(user)
});
router.post("/register", async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const result = await userService.register(username,password)
    res.json(result)
})

module.exports = router