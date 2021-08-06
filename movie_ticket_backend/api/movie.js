const express = require("express")
const { getSeat, buyTicket, getTicket, returnTicket } = require("../service/seat")
const router = express.Router()

router.post("/seat", async (req, res) => {
    seat = await getSeat(req.body.id)
    res.json(seat)
})

router.post("/ticket", async(req, res) => {
    yourTicket = await getTicket(req.body.username)
    res.json({"yourTicket" : yourTicket})
})

router.delete("/ticket", async(req, res) => {
    message = await returnTicket(req.body.username, req.body.ticketId)
    res.json(message)
})

router.post("/ticket/buy", async(req, res) => {
    message = await buyTicket(req.body)
    res.json(message)
})
module.exports = router