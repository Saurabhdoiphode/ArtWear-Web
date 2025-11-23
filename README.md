# ArtWear Website

A modern, responsive multi-page marketing site for the ArtWear startup: custom apparel with 360° preview and sustainable production.

## Features
- Responsive layout (mobile, tablet, desktop)
- Sticky header with navigation + mobile toggle
- Hero with animated 360° T-shirt SVG
- Sections: Customization banner, app flow, quote, gallery, detailed info, download app
- Footer with company info, working hours, subscription form
- Additional pages: About, Team, Contact (validated form), Career, Blog placeholder
- Smooth scrolling for internal anchors
- Loading overlay with spinner
- Form validation (contact + subscription)
- Accessible focus states & semantic structure
- Purple/blue gradient design system inspired by provided reference

## Tech Stack
- HTML5, CSS3 (Flexbox, Grid, responsive media queries)
- Vanilla JavaScript (no build step required)
- Font Awesome icons (CDN)
- Google Fonts (Poppins)

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
    img/ (place future images)
```

## Getting Started
Open `index.html` in any modern browser.

On Windows (PowerShell):
```
Start-Process index.html
```

## Customization
- Colors: Update CSS variables in `assets/css/style.css` under `:root`.
- Add images: Place in `assets/img` and reference in HTML where needed.
- Modify steps/features: Adjust markup in `index.html` sections.

## Accessibility
- Focus indicators for interactive elements.
- Semantic landmarks: `header`, `nav`, `main`, `footer`, `section`.

## Future Enhancements
- Integrate real image sequence for true 360° product using multiple frames.
- Backend integration for subscription & contact forms.
- User authentication modal for Sign In / Register.

## License
No license specified (proprietary / internal). Add a license if open sourcing.
