const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`select e.*,
		    COALESCE (
          json_agg(to_jsonb(q)) FILTER (WHERE q.id is not null), 
          '[]') as quotes
      from episodes e
      join quotes q on e.id = q.episode_id
      group by e.id`);
    return rows.map((row) => new Episode(row));
  }
}

module.exports = { Episode };
