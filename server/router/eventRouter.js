const { Router } = require("express");
const router = Router();

const eventController = require("../controllers/eventController");

router.get("/allEvents", eventController.getAllEvents)

module.exports = router;