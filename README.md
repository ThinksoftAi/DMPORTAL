# Deepali Minerals B2B Portal

Phase 1 and Phase 2 frontend foundation. This is deliberately dependency-free: all content is centralized in `assets/js/data.js` and pages share the same presentation layer in `assets/js/app.js`.

## Canonical Repository
- Repository: **DMPORTAL**
- Production Target Domain: **https://deepaliminerals.in**

## Run Locally

Serve this folder with any static web server. For example, on a machine with Python installed:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

Alternatively, with Node.js:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Routes

- `/` — Homepage discovery experience
- `/products/` — Full master product catalogue
- `/product.html?product=talc` — Talc Powder technical overview
- `/product.html?product=calcium-carbonate` — Calcium Carbonate overview
- `/product.html?product=zinc-oxide` — Zinc Oxide overview
- `/product.html?product=<slug>` — Universal dynamic product detail template

The product template supports every product supplied in the catalogue through its `product` query parameter.

## Project Structure

```text
DMPORTAL/
├── README.md               # Architecture and setup documentation
├── index.html              # Discovery entry point (data-page="home")
├── product.html            # Dynamic product detail shell (data-page="product")
├── products/
│   └── index.html          # Catalogue directory (data-page="products")
├── assets/
│   ├── css/
│   │   └── styles.css      # Core presentation & responsive styling
│   └── js/
│       ├── config.js       # Configurable domain & environment settings
│       ├── data.js         # Single source of truth for products and company data
│       └── app.js          # Shared presentation & dynamic rendering controller
└── .env.example            # Environment template for site URL configuration
```
