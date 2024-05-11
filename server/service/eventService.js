const sql = require('mssql');

const dbConfig = require("../db");

class EventService {
  async getAllEvents() {
    try {
      const pool = await sql.connect(dbConfig);
      const eventsQuery = await pool.request().query(`SELECT * FROM Events`);

      return eventsQuery.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}



module.exports = new EventService();