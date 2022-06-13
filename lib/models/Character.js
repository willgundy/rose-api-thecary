const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT c.*, COALESCE (
              json_agg(to_jsonb(q)) FILTER (WHERE q.id is not null), 
              '[]') as quotes
          from characters c
          left join quotes q on c.id = q.character_id
          group by c.id`);
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
