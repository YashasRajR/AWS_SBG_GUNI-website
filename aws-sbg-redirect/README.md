# AWS Student Builder Group Ganpat University - Unified Glass-Brutalist Portal

A single-viewport, responsive HTML page engineered with a **Glassmorphic Neo-Brutalism** aesthetic, a **unified co-branded top navigation bar**, and a strict **no-scroll guarantee** (`100dvh` / `overflow: hidden`) that serves as an official entry portal and redirect gateway to the AWS SBG Ganpat University website.

---

## 🚀 Live Destination

- **Target Website**: [https://aws-sbg-guni-website.onrender.com](https://aws-sbg-guni-website.onrender.com)

---

## 📁 Folder Structure

```
aws-sbg-redirect/
├── index.html        # Self-contained, glass-brutalist HTML page (no scroll)
├── assets/
│   ├── favicon.svg   # Official AWS SBG geometric icon
│   └── guni-logo.png # Ganpat University Centre of Excellence logo
└── README.md         # Documentation & guide
```

---

## 🌟 Key Features

1. **Unified Co-Branded Top Navbar**:
   - Single, integrated header bar housing the official AWS SBG geometric logo, community title, live verified portal pill, and Ganpat University Centre of Excellence emblem in one cohesive container.

2. **Glassmorphic Neo-Brutalism**:
   - Translucent frosted glass surfaces (`backdrop-filter: blur(28px)`).
   - High-contrast 2.5px/3px borders with solid offset drop shadows.
   - Retro terminal window ribbon, yellow accent stamp, and interactive feature chips.

3. **Strict No-Scroll Architecture**:
   - Built with `height: 100%; height: 100dvh; max-height: 100dvh; overflow: hidden;`.
   - Guaranteed single-screen display across mobile, tablet, laptop, and desktop viewports with zero scrollbars.

4. **Tactile Interactive Navigation**:
   - Tactile purple CTA button (**"EXPLORE OFFICIAL WEBSITE ↗"**) routing directly to `https://aws-sbg-guni-website.onrender.com`.

---

## 💻 How to View Locally

Double-click `index.html` in Windows Explorer to open it in your default browser, or serve it:

```powershell
python -m http.server 8080 --directory "d:\GUNI\AWS SBG GUNI\aws-sbg-redirect"
```
