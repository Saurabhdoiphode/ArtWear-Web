# ArtWear-Web

Modern, responsive multi-page marketing site for the ArtWear startup: custom apparel with 360° preview concept and sustainable production messaging.

## Features
- Responsive layout (mobile / tablet / desktop)
- Sticky header with navigation + mobile toggle
- Hero with animated 360° T‑shirt SVG placeholder
- Sections: customization banner, app flow, quote, gallery, detailed info, download CTA
- Footer with company info, working hours, subscription form
- Additional pages: About, Team, Contact (validated form), Career, Blog placeholder
- Smooth scrolling for internal anchors & loading overlay spinner
- Form validation (contact + subscription)
- Accessible focus states & semantic structure
- Purple/blue gradient design system

## Tech Stack
- HTML5, CSS3 (Flexbox, Grid, media queries)
- Vanilla JavaScript (no build step)
- Font Awesome (CDN), Google Fonts (Poppins)

## Structure
```
ArtWear/
  index.html
  about.html
  team.html
  contact.html
  career.html
  blog.html
  assets/
    css/style.css
    js/main.js
    img/
```

## Getting Started
Open `index.html` directly in any modern browser.

PowerShell quick launch:
```
Start-Process index.html
```

## Customization
- Colors: adjust CSS variables in `assets/css/style.css` under `:root`
- Images: add to `assets/img` and reference in markup
- Steps/features: edit relevant `<section>` blocks in `index.html`

## Accessibility
- Clear focus indicators
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`)

## Future Enhancements
- Real 360° frame sequence for product rotation
- Backend for subscription & contact form submissions
- Auth modal (Sign In / Register)

## License
Currently proprietary; add a license if open sourcing.

## Author
GitHub: [@saurabhdoiphode](https://github.com/Saurabhdoiphode)
Contact: saurabhdoiphode1711@gmail.com
