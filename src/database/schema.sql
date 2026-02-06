-- Micro Acquisition Scout - Database Schema
-- SQLite

-- Listings table: stores scraped business listings
CREATE TABLE IF NOT EXISTS listings (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  monthly_revenue INTEGER,
  monthly_profit INTEGER,
  profit_multiple REAL,
  category TEXT,
  monetization TEXT,
  description TEXT,
  age_months INTEGER,
  traffic_monthly INTEGER,
  seller_reason TEXT,
  listing_date TEXT,
  scraped_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(platform, url)
);

-- Scores table: stores computed scores for listings
CREATE TABLE IF NOT EXISTS scores (
  listing_id TEXT PRIMARY KEY,
  total_score INTEGER NOT NULL,
  rating TEXT NOT NULL,
  score_multiple REAL,
  score_profit_margin REAL,
  score_price_value REAL,
  score_age REAL,
  score_traffic REAL,
  computed_at TEXT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- Alerts table: user-defined alerts (for future)
CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price_min INTEGER,
  price_max INTEGER,
  score_min INTEGER,
  categories TEXT, -- JSON array
  created_at TEXT NOT NULL,
  active INTEGER DEFAULT 1
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_listings_platform ON listings(platform);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_scraped_at ON listings(scraped_at);
CREATE INDEX IF NOT EXISTS idx_scores_total_score ON scores(total_score);
CREATE INDEX IF NOT EXISTS idx_scores_rating ON scores(rating);
