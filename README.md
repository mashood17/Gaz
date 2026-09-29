# Royal Gazebo Restaurant — Luxury Digital Experience & Menu

> **"A Royal Taste in Every Bite"**  
> Mischief Mall, Ground Floor, K S Rao Road, Mangaluru, Karnataka, India

A bespoke, production-ready luxury web application and interactive digital menu built for **Royal Gazebo Restaurant** using **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Architecture & Technology Stack

* **Framework**: Next.js 16 with App Router (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`)
* **State & Motion**: Framer Motion for choreographed transitions, spring physics, and layout animations
* **Styling**: Tailwind CSS with custom luxury tokens, gold gradients, and dark ambient surfaces
* **Typography**: `next/font/google` self-hosting **Playfair Display** (headings) & **Montserrat** (interface, prices, descriptions)
* **Icons**: Lucide React
* **Testing**: Built-in Node.js test runner with TypeScript type-stripping

---

## Design System & Color Palette

| Token | Hex Code | Role |
| :--- | :--- | :--- |
| **Main Background** | `#0B0704` | Deep obsidian luxury base |
| **Section Background** | `#1A0E06` | Warm dark espresso surface |
| **Card / Surface** | `#24150A` | Rich dark brown card background |
| **Primary Gold** | `#F4B24D` | Vibrant gold accent & interactive highlights |
| **Royal Gold** | `#D18B2C` | Deep burnished gold border & active states |
| **Warm Amber** | `#F7C875` | Bright gold gradient highlight |
| **Cream Text** | `#F6E6C9` | High-contrast editorial headline text |
| **Muted Gold Text** | `#D9C4A1` | Readable secondary copy & metadata |
| **Deep Brown** | `#4B2A12` | Subtle dividers & shadows |
| **Restrained Red** | `#8B1E1E` | Accent indicator |

---

## Key Features

### 1. Cinematic Opening & Docking Splash Screen
* Dark `#0B0704` backdrop with a warm gold radial glow.
* 100% circular, transparent brand emblem without square boxes or distortion.
* Smooth 3.2-second hold and travel animation into the top-left navbar slot.
* Hero section begins entrance animation strictly after splash exit completes.
* Session storage (`rg_splash_shown`) ensures splash plays only once per session.

### 2. Interactive Digital Menu (`?menu`)
* **Simple by Default**: Dish rows are compact and scannable without food image distractions.
* **Accordion Details**: Clicking any dish reveals verified descriptions, dietary tags, and timing info.
* **Dietary Filters**: Segmented pill controls for `ALL`, `VEG`, and `NON-VEG`.
* **Category Navigation**: Horizontally scrollable category bar with `ALL` as the first tab (`Snacks`, `Sandwiches`, `Chats`, `Evening Special`, `Beverages`, `Royal Specials`).
* **Instant Search**: Real-time filtering across dish names, categories, and descriptions.

### 3. Shopping Cart & Real-Time Calculations
* Synchronized cart state persisted in `localStorage`.
* Quantity steppers `[ − ] 1 [ + ]` on every menu row and inside the cart drawer.
* Header cart badge displaying total item count and live subtotal.
* Mobile floating bottom bar: `[ View Cart (X items) · ₹XX -> ]`.

### 4. Direct WhatsApp Ordering Integration
* Connects directly to the restaurant's phone: `+91 87921 32211`.
* Generates a prefilled, formatted order breakdown with item names, portions, line totals, and subtotal.

---

## Getting Started

### Prerequisites
* Node.js v20+ (Node.js 22 recommended)
* npm or pnpm

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Automated Tests
```bash
npm run test
```

### Production Build & Launch
```bash
npm run build
npm run start
```

---

## Production Deployment (Vercel)

This repository is optimized for one-click deployment on **Vercel**:
1. Import repository from GitHub (`mashood17/Gaz`).
2. Framework preset will automatically detect **Next.js**.
3. Deploy! Zero additional configuration required.

---

## License & Credits
© Royal Gazebo Restaurant, Mischief Mall, Mangaluru. All rights reserved.
