# GeckoRoo Website

Fast, simple affiliate site built with Astro, Tailwind CSS, and Pagefind for search. Deploy-ready for Cloudflare Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
geckoroo-website/
├── src/
│   ├── components/     # Astro components
│   ├── content/        # Product content (Markdown)
│   ├── layouts/        # Page layouts
│   └── pages/          # Site pages
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Search**: Pagefind
- **Content**: Markdown/MDX
- **Deployment**: Cloudflare Pages

## 📝 Adding Products

Create new product files in `src/content/picks/` with the following frontmatter:

```yaml
---
title: "Product Name"
slug: "product-slug"
category: "Category"
blurb: "Short description"
price_hint: "$XX.XX"
aff_url: "https://affiliate-link"
image: "/assets/images/product.jpg"
pros:
  - "Pro 1"
  - "Pro 2"
cons:
  - "Con 1"
badges: ["Pick of the Week"]
yt_video_id: "VIDEO_ID"
featured: true
publishDate: 2024-01-15
---
```

## 🚀 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Deploy!

## 📄 License

© 2024 GeckoRoo. All rights reserved.

## 🤝 Affiliate Disclosure

This site contains affiliate links. We earn commissions on qualifying purchases.