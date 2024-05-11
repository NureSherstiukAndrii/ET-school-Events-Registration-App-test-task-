const { Router } = require("express");
const router = Router();

const eventController = require("../controllers/eventController");

router.get("/allEvents", eventController.getAllEvents)
  .post("/addUserToEvent", eventController.addUserToEvent)

module.exports = router;