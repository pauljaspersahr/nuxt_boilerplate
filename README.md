# Nuxt 3 Shadcn Landing Pro 🚀

Nuxt 3 Shadcn Landing Pro is a beautifully designed landing page template for SaaS products, built with Nuxt 3 and Shadcn components. This project provides a sleek, modern, and highly customizable landing page to showcase your SaaS product effectively.

Get started, customize and launch in no time. Now finally with Shadcn components for Nuxt 3 enthusiast!

## Features
- Deploy ready page with sections
- Easy customization with Tailwind CSS
- Google Analytics integration
- SEO-friendly with sitemap and robots.txt
- Vercel analytics integration
- Pre-configured for fast deployment with Vercel

## Getting Started

### Prerequisites
Ensure you have Node.js and npm (or pnpm, bun) installed on your machine.

### Installation

#### Using npm
```sh
npm install
```

#### Using pnpm
```sh
pnpm install
```

#### Using bun
```sh
bun install
```

### Running the Development Server

#### Using npm
```sh
npm run dev
```

#### Using pnpm
```sh
pnpm run dev
```

#### Using bun
```sh
bun run dev
```

### Building the Project

#### Using npm
```sh
npm run build
```

#### Using pnpm
```sh
pnpm run build
```

#### Using bun
```sh
bun run build
```

## Configuration

1. **Environment Variables**:
   Copy the `.env.example` to `.env` and set the required variables.
   ```sh
   cp .env.example .env
   ```
   Set the `NUXT_PUBLIC_GTAG_ID` variable in the `.env` file with your Google Analytics Tracking ID.

2. **Configuration**:
   Edit the variables in the config files in the `/config` folder to customize the site title and contents.

3. **Favicon**:
   Create a favicon using [realfavicongenerator.net](https://realfavicongenerator.net/) and place it in the `public` directory as `favicon.ico`.

## Customization

### Change Theme Color

To change the primary theme color, update the `--primary` variable in `assets/css/tailwind.css`:

```css
:root {
  --primary: your hsl color;
}
```

## Technologies Used

### Core
- **Nuxt 3**: The main framework for building the application.
- **Vue 3**: The progressive JavaScript framework used by Nuxt.

### Styling
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Tailwind Merge**: Tool for merging Tailwind classes.
- **AOS**: Animate on scroll.

### UI Components
- **Shadcn Nuxt**: A component library for Nuxt.
- **Iconify**: Icon library containing multiple icon collections.
- **Radix Vue**: UI component library for building high-quality accessible web apps.

### Analytics and SEO
- **nuxt-gtag**: Google Analytics integration for Nuxt.
- **@nuxtjs/sitemap**: Automatically generate a sitemap for your Nuxt application.
- **@nuxtjs/robots**: Module to manage robots.txt.
- **nuxt-vercel-analytics**: Vercel analytics integration.

### Development Tools
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript.
- **Prettier**: Code formatter for consistent style.