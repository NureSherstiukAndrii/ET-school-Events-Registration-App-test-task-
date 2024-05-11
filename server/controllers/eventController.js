const eventService = require("../service/eventService");

class EventControllers {
  async getAllEvents(req, res, next){
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventControllers();
