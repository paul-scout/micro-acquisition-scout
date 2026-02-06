/**
 * Demo Script - Proof of Concept
 * 
 * Demonstrates:
 * 1. Scraping listings (mock data)
 * 2. Scoring algorithm
 * 3. Sorted results
 */

const FlippaScraper = require('./scrapers/flippa');
const DealScorer = require('./scoring/scorer');

async function runDemo() {
  console.log('🚀 Micro Acquisition Scout - PoC Demo\n');
  console.log('=' .repeat(60));

  // Step 1: Scrape listings
  const scraper = new FlippaScraper();
  const listings = await scraper.scrapeListings({
    priceMin: 4000,
    priceMax: 50000,
    limit: 10
  });

  console.log('\n' + '='.repeat(60));
  console.log('📊 Scoring deals...\n');

  // Step 2: Score listings
  const scorer = new DealScorer();
  const scoredListings = scorer.scoreListings(listings);

  // Step 3: Display top deals
  console.log('🏆 TOP 5 DEALS:\n');
  scoredListings.slice(0, 5).forEach((deal, index) => {
    console.log(`${index + 1}. ${deal.title}`);
    console.log(`   💰 Price: $${deal.price.toLocaleString()}`);
    console.log(`   📈 Revenue: $${deal.monthlyRevenue.toLocaleString()}/mo`);
    console.log(`   💵 Profit: $${deal.monthlyProfit.toLocaleString()}/mo`);
    console.log(`   📊 Multiple: ${deal.profitMultiple}x`);
    console.log(`   ⭐ Score: ${deal.scoring.score}/100 (${deal.scoring.rating})`);
    console.log(`   🔗 ${deal.url}`);
    console.log('');
  });

  // Step 4: Summary statistics
  console.log('='.repeat(60));
  console.log('📈 SUMMARY:\n');
  const avgScore = Math.round(
    scoredListings.reduce((sum, d) => sum + d.scoring.score, 0) / scoredListings.length
  );
  const excellent = scoredListings.filter(d => d.scoring.rating === 'Excellent').length;
  const good = scoredListings.filter(d => d.scoring.rating === 'Good').length;

  console.log(`Total Deals: ${scoredListings.length}`);
  console.log(`Average Score: ${avgScore}/100`);
  console.log(`Excellent Deals: ${excellent}`);
  console.log(`Good Deals: ${good}`);
  console.log('\n✅ Demo complete!');
}

// Run the demo
runDemo().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
