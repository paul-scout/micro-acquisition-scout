/**
 * Test Real Flippa Scraper
 * 
 * Tests the Puppeteer-based scraper with live Flippa data
 */

const FlippaRealScraper = require('./scrapers/flippa-real');
const DealScorer = require('./scoring/scorer');

async function test() {
  console.log('🧪 Testing Real Flippa Scraper\n');
  console.log('='.repeat(60));

  const scraper = new FlippaRealScraper();
  const scorer = new DealScorer();

  try {
    // Scrape real listings
    const listings = await scraper.scrapeListings({
      priceMin: 4000,
      priceMax: 50000,
      limit: 10
    });

    if (listings.length === 0) {
      console.log('⚠️ No listings found. Flippa might be blocking or DOM changed.');
      return;
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Scoring...\n');

    // Score listings
    const scored = scorer.scoreListings(listings);

    console.log('🏆 TOP 5 REAL DEALS:\n');
    scored.slice(0, 5).forEach((deal, index) => {
      console.log(`${index + 1}. ${deal.title}`);
      console.log(`   💰 Price: $${deal.price.toLocaleString()}`);
      console.log(`   📈 Revenue: $${deal.monthlyRevenue.toLocaleString()}/mo`);
      console.log(`   💵 Profit: $${deal.monthlyProfit.toLocaleString()}/mo`);
      console.log(`   ⭐ Score: ${deal.scoring.score}/100 (${deal.scoring.rating})`);
      console.log(`   🔗 ${deal.url}`);
      console.log('');
    });

    console.log('='.repeat(60));
    console.log('✅ Test complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    await scraper.close();
  }
}

test().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
