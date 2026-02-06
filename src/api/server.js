/**
 * API Server - Express.js
 * 
 * Endpoints:
 * - GET /api/deals - Get top deals
 * - GET /api/stats - Get database stats
 * - POST /api/scrape - Trigger new scrape
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const ScoutDB = require('../database/db');
const FlippaScraper = require('../scrapers/flippa');
const DealScorer = require('../scoring/scorer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

// Database instance
const db = new ScoutDB();

/**
 * GET /api/deals
 * Get top deals sorted by score
 */
app.get('/api/deals', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const deals = db.getTopDeals(limit);
    
    res.json({
      success: true,
      count: deals.length,
      deals: deals.map(deal => ({
        id: deal.id,
        title: deal.title,
        url: deal.url,
        price: deal.price,
        monthlyRevenue: deal.monthly_revenue,
        monthlyProfit: deal.monthly_profit,
        profitMultiple: deal.profit_multiple,
        category: deal.category,
        monetization: deal.monetization,
        description: deal.description,
        age: deal.age_months,
        traffic: deal.traffic_monthly,
        score: deal.total_score,
        rating: deal.rating,
        scrapedAt: deal.scraped_at
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/stats
 * Get database statistics
 */
app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/scrape
 * Trigger new scraping run
 */
app.post('/api/scrape', async (req, res) => {
  try {
    const { limit = 10, priceMin = 4000, priceMax = 50000 } = req.body;

    console.log(`🔍 Scraping ${limit} listings...`);

    const scraper = new FlippaScraper();
    const scorer = new DealScorer();

    const listings = await scraper.scrapeListings({ priceMin, priceMax, limit });

    let saved = 0;
    for (const listing of listings) {
      const scoring = scorer.scoreListing(listing);
      db.upsertListing(listing);
      db.saveScore(listing.id, scoring);
      saved++;
    }

    console.log(`✅ Saved ${saved} listings`);

    res.json({
      success: true,
      message: `Scraped and saved ${saved} listings`,
      saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /
 * Serve dashboard
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Micro Acquisition Scout API`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/deals`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  db.close();
  process.exit(0);
});
