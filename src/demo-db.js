/**
 * Demo Script with Database - Proof of Concept
 * 
 * Demonstrates:
 * 1. Scraping listings (mock data)
 * 2. Storing in SQLite database
 * 3. Scoring algorithm
 * 4. Retrieving top deals from DB
 */

const FlippaScraper = require('./scrapers/flippa');
const DealScorer = require('./scoring/scorer');
const ScoutDB = require('./database/db');

async function runDemo() {
  console.log('🚀 Micro Acquisition Scout - PoC with Database\n');
  console.log('=' .repeat(60));

  const db = new ScoutDB();
  
  try {
    // Step 1: Scrape listings
    console.log('📡 Step 1: Scraping listings...\n');
    const scraper = new FlippaScraper();
    const listings = await scraper.scrapeListings({
      priceMin: 4000,
      priceMax: 50000,
      limit: 15
    });

    console.log('\n' + '='.repeat(60));
    console.log('💾 Step 2: Storing in database...\n');

    // Step 2: Score and save to DB
    const scorer = new DealScorer();
    let saved = 0;

    for (const listing of listings) {
      // Score the listing
      const scoring = scorer.scoreListing(listing);
      
      // Save to database
      db.upsertListing(listing);
      db.saveScore(listing.id, scoring);
      saved++;
    }

    console.log(`✅ Saved ${saved} listings with scores`);

    // Step 3: Retrieve top deals from DB
    console.log('\n' + '='.repeat(60));
    console.log('📊 Step 3: Retrieving top deals from database...\n');

    const topDeals = db.getTopDeals(5);

    console.log('🏆 TOP 5 DEALS (from database):\n');
    topDeals.forEach((deal, index) => {
      console.log(`${index + 1}. ${deal.title}`);
      console.log(`   💰 Price: $${deal.price.toLocaleString()}`);
      console.log(`   📈 Revenue: $${deal.monthly_revenue.toLocaleString()}/mo`);
      console.log(`   💵 Profit: $${deal.monthly_profit.toLocaleString()}/mo`);
      console.log(`   📊 Multiple: ${deal.profit_multiple}x`);
      console.log(`   ⭐ Score: ${deal.total_score}/100 (${deal.rating})`);
      console.log(`   🔗 ${deal.url}`);
      console.log('');
    });

    // Step 4: Stats
    console.log('='.repeat(60));
    console.log('📈 DATABASE STATS:\n');
    
    const stats = db.getStats();
    console.log(`Total Listings: ${stats.totalListings}`);
    console.log(`Average Score: ${stats.avgScore}/100`);
    console.log(`Excellent Deals: ${stats.excellentDeals}`);
    console.log(`Good Deals: ${stats.goodDeals}`);
    console.log('\n✅ Demo complete! Database saved to: ./data/scout.db');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    db.close();
  }
}

// Run the demo
runDemo().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
