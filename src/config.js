/**
 * Configuration
 */

module.exports = {
  // Scraper mode: 'mock' or 'real'
  scraperMode: process.env.SCRAPER_MODE || 'mock',

  // Server
  port: process.env.PORT || 3000,

  // Database
  dbPath: process.env.DB_PATH || './data/scout.db',

  // Scraping settings
  scraping: {
    defaultLimit: 20,
    priceMin: 4000,
    priceMax: 50000,
    rateLimitMs: 5000, // Wait 5s between scrapes
  },

  // Scoring weights (can be tuned)
  scoring: {
    weights: {
      multiple: 0.30,
      profitMargin: 0.25,
      priceValue: 0.20,
      age: 0.15,
      traffic: 0.10
    }
  }
};
