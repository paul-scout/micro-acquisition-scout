# 🎯 Micro Acquisition Scout

> Automated deal scout for micro-acquisitions ($4k-$50k businesses). Find profitable small businesses before others do.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/paul-scout/micro-acquisition-scout)
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

## 🎯 Target MVP (4 Weeks)

**Week 1:** Foundation & Scraper
- Flippa scraper (priority #1)
- MicroAcquire scraper
- Database setup (PostgreSQL)

**Week 2:** Scoring & Dashboard
- Scoring algorithm
- Basic dashboard (view listings, filter, sort)

**Week 3:** Alerts & User Accounts
- User authentication
- Email alerts (new deals matching filters)
- Favorites & notes

**Week 4:** Polish & Launch
- Landing page
- Onboarding flow
- Beta launch (ProductHunt, Reddit)

---

## 🛠️ Tech Stack

**Backend:**
- Node.js (bun preferred)
- Puppeteer (scraping)
- PostgreSQL / Supabase
- Node-Cron (scheduling)

**Frontend:**
- Next.js
- Tailwind CSS
- Vercel (hosting)

**Notifications:**
- Resend / SendGrid (email)
- Telegram Bot API (optional)

---

## 💰 Monetization

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 5 deals/week, basic scoring |
| **Scout** | $29/mo | Unlimited deals, alerts, favorites |
| **Pro** | $99/mo | Priority alerts, advanced scoring, Telegram |

---

## 📅 Roadmap

- [x] Project setup
- [ ] Flippa scraper prototype
- [ ] Database schema
- [ ] Scoring algorithm
- [ ] Basic dashboard
- [ ] User authentication
- [ ] Email alerts
- [ ] Landing page
- [ ] Beta launch

---

## 🤝 Contributing

This is a personal project, but feedback is welcome! Open an issue if you have ideas or find bugs.

---

## 📄 License

MIT

---

**Built by [Paul der II.](https://github.com/paul-scout) | 2026**
