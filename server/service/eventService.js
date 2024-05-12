const sql = require('mssql');

const dbConfig = require("../db");

class EventService {
  async getAllEvents(offset, limit) {
    try {
      const pool = await sql.connect(dbConfig);
      const eventsQuery = await pool.request().query(`SELECT * FROM Events ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`);
      return eventsQuery.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEvent(id) {
    try {
      const pool = await sql.connect(dbConfig);
      const eventQuery = await pool.request().query(`SELECT * FROM Events WHERE id=${id}`);
      return eventQuery.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addUserToEvent(fullName, email, birthDate, hearFrom, eventId) {
    try {
      const pool = await sql.connect(dbConfig);
      const checkParticipant = await pool.request().query(
        `SELECT * FROM Event_participant WHERE email = '${email}' AND event_id = ${eventId}`
      );


      if (checkParticipant.recordset.length > 0) {
        return {
          status: 400,
          massage: `Participant ${email} already registered`
        }
      }

      await pool.request().query(
        `INSERT INTO Event_participant (name, email, birth_date, heard_from, event_id) 
                 VALUES ('${fullName}', '${email}', '${birthDate}', '${hearFrom}', ${eventId})`
      );

      return `Participant ${email} registered successfully`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getParticipants(id) {
    try {
      const pool = await sql.connect(dbConfig);
      const participantsQuery = await pool.request().query(`SELECT * FROM Event_participant WHERE event_id=${id}`);
      return participantsQuery.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



module.exports = new EventService();