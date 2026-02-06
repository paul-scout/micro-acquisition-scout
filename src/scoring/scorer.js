/**
 * Deal Scoring Algorithm
 * 
 * Scores listings based on multiple factors:
 * - Price/Revenue ratio
 * - Profit margin
 * - Multiple (Price/Profit)
 * - Age/Stability
 * - Traffic trends
 */

class DealScorer {
  constructor() {
    this.weights = {
      multiple: 0.30,      // Lower multiple = better
      profitMargin: 0.25,  // Higher margin = better
      priceValue: 0.20,    // Sweet spot pricing
      age: 0.15,           // Established but not too old
      traffic: 0.10        // Higher traffic = better
    };
  }

  /**
   * Score a single listing (0-100 scale)
   */
  scoreListing(listing) {
    const scores = {
      multiple: this.scoreMultiple(listing.profitMultiple),
      profitMargin: this.scoreProfitMargin(listing.monthlyProfit, listing.monthlyRevenue),
      priceValue: this.scorePriceValue(listing.price),
      age: this.scoreAge(listing.age),
      traffic: this.scoreTraffic(listing.trafficMonthly)
    };

    // Weighted total
    const totalScore = Object.keys(scores).reduce((sum, key) => {
      return sum + (scores[key] * this.weights[key]);
    }, 0);

    return {
      score: Math.round(totalScore),
      breakdown: scores,
      rating: this.getRating(totalScore)
    };
  }

  /**
   * Score profit multiple (lower is better)
   * Good deal: 1-2x, OK: 2-3x, Expensive: 3x+
   */
  scoreMultiple(multiple) {
    if (!multiple || multiple <= 0) return 0;
    if (multiple < 1.5) return 100;
    if (multiple < 2.0) return 90;
    if (multiple < 2.5) return 75;
    if (multiple < 3.0) return 60;
    if (multiple < 4.0) return 40;
    return 20;
  }

  /**
   * Score profit margin (higher is better)
   */
  scoreProfitMargin(profit, revenue) {
    if (!revenue || revenue <= 0) return 0;
    const margin = (profit / revenue) * 100;
    if (margin >= 70) return 100;
    if (margin >= 60) return 90;
    if (margin >= 50) return 80;
    if (margin >= 40) return 70;
    if (margin >= 30) return 60;
    if (margin >= 20) return 40;
    return 20;
  }

  /**
   * Score price value (sweet spot: $10k-$30k)
   */
  scorePriceValue(price) {
    if (price >= 10000 && price <= 30000) return 100;
    if (price >= 8000 && price <= 35000) return 85;
    if (price >= 5000 && price <= 40000) return 70;
    return 50;
  }

  /**
   * Score age (established but not stale)
   * Sweet spot: 12-36 months
   */
  scoreAge(ageMonths) {
    if (ageMonths >= 12 && ageMonths <= 36) return 100;
    if (ageMonths >= 6 && ageMonths <= 48) return 80;
    if (ageMonths >= 3 && ageMonths <= 60) return 60;
    return 40;
  }

  /**
   * Score traffic (higher is better, but not the main factor)
   */
  scoreTraffic(monthlyVisits) {
    if (monthlyVisits >= 50000) return 100;
    if (monthlyVisits >= 20000) return 85;
    if (monthlyVisits >= 10000) return 70;
    if (monthlyVisits >= 5000) return 55;
    return 40;
  }

  /**
   * Get rating label from score
   */
  getRating(score) {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Fair';
    if (score >= 40) return 'Below Average';
    return 'Poor';
  }

  /**
   * Score multiple listings and sort by score
   */
  scoreListings(listings) {
    return listings.map(listing => ({
      ...listing,
      scoring: this.scoreListing(listing)
    })).sort((a, b) => b.scoring.score - a.scoring.score);
  }
}

module.exports = DealScorer;
