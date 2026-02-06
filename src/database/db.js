/**
 * Database Layer - SQLite
 * 
 * Handles all database operations for listings and scores
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

class ScoutDB {
  constructor(dbPath = './data/scout.db') {
    // Ensure data directory exists
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL'); // Better concurrency
    this.initSchema();
  }

  /**
   * Initialize database schema
   */
  initSchema() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    this.db.exec(schema);
  }

  /**
   * Insert or update a listing
   */
  upsertListing(listing) {
    const stmt = this.db.prepare(`
      INSERT INTO listings (
        id, platform, title, url, price, monthly_revenue, monthly_profit,
        profit_multiple, category, monetization, description, age_months,
        traffic_monthly, seller_reason, listing_date, scraped_at, updated_at
      ) VALUES (
        @id, @platform, @title, @url, @price, @monthlyRevenue, @monthlyProfit,
        @profitMultiple, @category, @monetization, @description, @age,
        @trafficMonthly, @sellerReason, @listingDate, @scrapedAt, @scrapedAt
      )
      ON CONFLICT(url) DO UPDATE SET
        price = excluded.price,
        monthly_revenue = excluded.monthly_revenue,
        monthly_profit = excluded.monthly_profit,
        profit_multiple = excluded.profit_multiple,
        updated_at = excluded.updated_at
    `);

    return stmt.run(listing);
  }

  /**
   * Save score for a listing
   */
  saveScore(listingId, scoring) {
    const stmt = this.db.prepare(`
      INSERT INTO scores (
        listing_id, total_score, rating,
        score_multiple, score_profit_margin, score_price_value,
        score_age, score_traffic, computed_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
      )
      ON CONFLICT(listing_id) DO UPDATE SET
        total_score = excluded.total_score,
        rating = excluded.rating,
        score_multiple = excluded.score_multiple,
        score_profit_margin = excluded.score_profit_margin,
        score_price_value = excluded.score_price_value,
        score_age = excluded.score_age,
        score_traffic = excluded.score_traffic,
        computed_at = excluded.computed_at
    `);

    return stmt.run(
      listingId,
      scoring.score,
      scoring.rating,
      scoring.breakdown.multiple,
      scoring.breakdown.profitMargin,
      scoring.breakdown.priceValue,
      scoring.breakdown.age,
      scoring.breakdown.traffic
    );
  }

  /**
   * Get all listings with scores, sorted by score
   */
  getTopDeals(limit = 10) {
    const stmt = this.db.prepare(`
      SELECT 
        l.*,
        s.total_score,
        s.rating,
        s.score_multiple,
        s.score_profit_margin,
        s.score_price_value,
        s.score_age,
        s.score_traffic
      FROM listings l
      LEFT JOIN scores s ON l.id = s.listing_id
      ORDER BY s.total_score DESC
      LIMIT ?
    `);

    return stmt.all(limit);
  }

  /**
   * Get listing by ID
   */
  getListing(id) {
    const stmt = this.db.prepare('SELECT * FROM listings WHERE id = ?');
    return stmt.get(id);
  }

  /**
   * Get stats
   */
  getStats() {
    const totalListings = this.db.prepare('SELECT COUNT(*) as count FROM listings').get().count;
    const avgScore = this.db.prepare('SELECT AVG(total_score) as avg FROM scores').get().avg;
    const excellentDeals = this.db.prepare("SELECT COUNT(*) as count FROM scores WHERE rating = 'Excellent'").get().count;
    const goodDeals = this.db.prepare("SELECT COUNT(*) as count FROM scores WHERE rating = 'Good'").get().count;

    return {
      totalListings,
      avgScore: avgScore ? Math.round(avgScore) : 0,
      excellentDeals,
      goodDeals
    };
  }

  /**
   * Close database connection
   */
  close() {
    this.db.close();
  }
}

module.exports = ScoutDB;
