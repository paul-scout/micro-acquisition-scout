# 🎯 Micro Acquisition Scout

> Automated deal scout for micro-acquisitions ($4k-$50k businesses). Find profitable small businesses before others do.

[![Status](https://img.shields.io/badge/status-PoC-yellow)](https://github.com/paul-scout/micro-acquisition-scout)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🚀 What is this?

**Micro Acquisition Scout** automatically finds, scores, and alerts you about profitable small businesses for sale across multiple platforms.

### The Problem
- Finding good micro-acquisitions ($4k-$50k) is manual and time-consuming
- Deals are sold within hours (first-mover advantage)
- No automated quality scoring
- Multiple platforms to check (Flippa, MicroAcquire, Empire Flippers, etc.)

### The Solution
- **Multi-platform scraper** (Flippa, MicroAcquire, Empire Flippers, BizBuySell)
- **Smart scoring system** (Revenue/Price ratio, profit margin, traffic trends, tech stack)
- **Instant alerts** (Email, Telegram optional)
- **Centralized dashboard** (All listings in one place, sorted by quality)

---

## 🎯 Current Status (Week 1 - PoC)

**✅ Completed:**
- [x] Project setup
- [x] Flippa scraper prototype (mock data)
- [x] Database schema (SQLite)
- [x] Scoring algorithm (5 factors: multiple, margin, price, age, traffic)
- [x] API (Express.js)
- [x] Web Dashboard

**⏳ Next:**
- [ ] Real Flippa scraping (Puppeteer)
- [ ] MicroAcquire scraper
- [ ] Email alerts
- [ ] Filters & search
- [ ] User authentication

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- SQLite (better-sqlite3)
- Cheerio + Axios (scraping)

**Frontend:**
- Vanilla HTML/CSS/JS
- No build step (yet)

**Future:**
- Puppeteer (for JS-heavy sites)
- Nodemailer (email alerts)
- Telegram Bot API (optional)

---

## 🚦 Quick Start

### Prerequisites
- Node.js 16+ 
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/paul-scout/micro-acquisition-scout.git
cd micro-acquisition-scout

# Install dependencies
npm install

# Run demo (mock data)
npm run demo

# Run demo with database
npm run demo-db

# Start API + Dashboard
npm start
```

Then open: **http://localhost:3000**

---

## 📊 Usage

### API Endpoints

**Get top deals:**
```bash
GET http://localhost:3000/api/deals?limit=10
```

**Get statistics:**
```bash
GET http://localhost:3000/api/stats
```

**Trigger scraping:**
```bash
POST http://localhost:3000/api/scrape
Content-Type: application/json

{
  "limit": 15,
  "priceMin": 4000,
  "priceMax": 50000
}
```

### Dashboard

Visit **http://localhost:3000** to see:
- Real-time deal listings
- Score breakdown
- Stats overview
- One-click scraping

---

## 📁 Project Structure

```
micro-acquisition-scout/
├── src/
│   ├── scrapers/        # Platform scrapers
│   │   └── flippa.js    # Flippa scraper (mock for PoC)
│   ├── scoring/         # Deal scoring logic
│   │   └── scorer.js    # Scoring algorithm
│   ├── database/        # SQLite database
│   │   ├── db.js        # Database wrapper
│   │   └── schema.sql   # DB schema
│   ├── api/             # Express API
│   │   └── server.js    # API server
│   ├── demo.js          # Demo script (no DB)
│   └── demo-db.js       # Demo with database
├── public/              # Frontend
│   └── index.html       # Dashboard
├── data/                # SQLite database file
│   └── scout.db         # Database (auto-created)
└── package.json         # Dependencies
```

---

## 🎯 Scoring Algorithm

Deals are scored 0-100 based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Multiple** | 30% | Lower profit multiple = better (< 2x is excellent) |
| **Profit Margin** | 25% | Higher margin = better (> 60% is excellent) |
| **Price Value** | 20% | Sweet spot: $10k-$30k |
| **Age** | 15% | Established but not stale (12-36 months ideal) |
| **Traffic** | 10% | Higher traffic = better validation |

**Ratings:**
- 85-100: Excellent
- 70-84: Good
- 55-69: Fair
- 40-54: Below Average
- 0-39: Poor

---

## 💰 Monetization (Future)

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 5 deals/week, basic scoring |
| **Scout** | $29/mo | Unlimited deals, alerts, favorites |
| **Pro** | $99/mo | Priority alerts, advanced scoring, Telegram |

---

## 📅 Roadmap

**Week 1 (Current):** ✅ PoC
- Scraper prototype (mock data)
- Scoring algorithm
- Database
- Basic API + Dashboard

**Week 2:** Real Scraping
- Puppeteer integration
- Flippa real scraping
- MicroAcquire scraper
- Error handling & rate limiting

**Week 3:** Alerts & Users
- User authentication
- Email alerts
- Favorites & notes
- Search & filters

**Week 4:** Polish & Launch
- Landing page
- Onboarding flow
- Beta invites
- ProductHunt launch

---

## 🤝 Contributing

This is a personal project, but feedback is welcome! Open an issue if you have ideas or find bugs.

---

## 📄 License

MIT

---

**Built by [Paul der II.](https://github.com/paul-scout) | February 2026**

---

## 🔥 Demo Output

```
🚀 Micro Acquisition Scout - PoC Demo

============================================================
🔍 Scraping Flippa listings ($4000-$50000)...
✅ Scraped 10 mock listings

============================================================
📊 Scoring deals...

🏆 TOP 5 DEALS:

1. Newsletter Business #4
   💰 Price: $10,962
   📈 Revenue: $3,932/mo
   💵 Profit: $3,074/mo
   📊 Multiple: 3.57x
   ⭐ Score: 78/100 (Good)
   🔗 https://flippa.com/listing/2280

[...]

============================================================
📈 SUMMARY:

Total Deals: 10
Average Score: 67/100
Excellent Deals: 0
Good Deals: 3

✅ Demo complete!
```
