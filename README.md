# FindNGR — Missing People Hotline

Nigeria's unified missing persons reporting platform. Report a missing person, connect with police, or anonymously share a sighting.

## Tech Stack

- **React 18** + **Vite 5**
- **CSS Variables** (design system from original prototype)
- **DM Serif Display** + **DM Sans** (Google Fonts)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Click Deploy — done ✅

## Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click Deploy — done ✅

## Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root component with global state
├── index.css                 # All styles (CSS variables + components)
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Footer.jsx
    ├── ModeBar.jsx
    ├── ProgressBar.jsx
    ├── ReportFlow.jsx
    ├── FinderFlow.jsx
    └── steps/
        ├── Step1PersonDetails.jsx
        ├── Step2PoliceStation.jsx
        ├── Step3POCEntry.jsx
        ├── Step4Review.jsx
        └── Step5Success.jsx
```

## Future Integrations

- **Africa's Talking** — SMS blast alerts
- **AWS Rekognition** — face-match search
- **Cloudinary** — photo storage
- **Google Maps API** — nearest police stations
- **Firebase** — push notifications
- **Supabase** — database & auth


## Major Dezigns Technologies
