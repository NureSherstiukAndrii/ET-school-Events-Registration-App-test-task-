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

  async addUserToEvent(req, res, next){
    try {
      const { fullName, email, birthDate, hearFrom, eventId } = req.body;
      res.json(await eventService.addUserToEvent(fullName, email, birthDate, hearFrom, eventId));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventControllers();
