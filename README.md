# Dyad Vue Template

> A minimal, production-ready Vue 3 starter template with TypeScript, Vite, and Tailwind CSS v3.

## ✨ Features

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety and better developer experience
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS v3.4.17** with complete design system
- **Responsive Layout** with proper centering utilities
- **Clean Starting Point** - minimal boilerplate, maximum flexibility
- **Bun Compatible** - works seamlessly with Bun package manager
- **Dark Mode Support** - class-based dark mode switching
- **Animation Ready** - includes tailwindcss-animate plugin

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0 (recommended >= 20.0)
- Bun, npm, yarn, or pnpm

### Installation

```sh
# Clone the template
git clone <repository-url>
cd dyad-vue-template

# Install dependencies
bun install
# or
npm install
```

### Development

```sh
# Start development server
bun dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view your app.

### Build for Production

```sh
# Type-check, compile and minify
bun run build
# or
npm run build

# Preview production build
bun run preview
# or
npm run preview
```

## 🎨 Tailwind CSS

This template includes a complete Tailwind CSS v3 setup with:

- **Custom Design System** - predefined colors, spacing, and typography
- **Dark Mode** - class-based dark mode (`dark:` prefix)
- **Custom Animations** - accordion animations and transitions
- **Component-Ready** - all utility classes available out of the box

### Configuration Files

- `tailwind.config.ts` - Tailwind configuration with TypeScript
- `postcss.config.js` - PostCSS configuration with autoprefixer
- `src/global.css` - Global styles and CSS custom properties

## 📁 Project Structure

```
.
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── ui/             # UI component library
│   │   └── MadeByDyad.vue  # Footer component
│   ├── views/              # Page components
│   │   └── HomeView.vue    # Home page
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── assets/             # Static assets and base styles
│   ├── lib/                # Utility functions
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── global.css           # Global styles with Tailwind
├── public/                 # Public static files
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3.5.18
- **Language**: TypeScript ~5.8.0
- **Build Tool**: Vite 6.0.0
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Reka UI library included
- **Routing**: Vue Router 4.5.1
- **State Management**: Pinia 3.0.3
- **Package Manager**: Bun compatible (also works with npm/yarn/pnpm)

## 🎯 Getting Started

This template provides a clean starting point with:

1. **Simple Layout** - Centered "Starting page" content with Dyad footer
2. **Responsive Design** - Works perfectly on all screen sizes
3. **Development Ready** - Hot module replacement and fast refresh
4. **Production Ready** - Optimized builds with tree-shaking

### Next Steps

1. Start building your components in `src/components/`
2. Add new routes in `src/router/index.ts`
3. Customize the design system in `tailwind.config.ts`
4. Build your pages in `src/views/`

## 🎨 Customization

### Tailwind Theme

Customize colors, fonts, and spacing in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      // Your custom colors
    },
    fontFamily: {
      // Your custom fonts
    },
  }
}
```

### Component Library

This template includes a comprehensive UI component library in `src/components/ui/`. Components are built with:

- Reka UI for accessibility
- Tailwind CSS for styling
- TypeScript for type safety
- Vue 3 Composition API

## 🔧 IDE Setup

### Recommended

- **VS Code** with the following extensions:
  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (formerly Volar)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Type Support

TypeScript support for `.vue` imports is enabled through `vue-tsc`. The template includes proper type declarations in `src/vite-env.d.ts`.

## 📦 Build & Deploy

The built files will be in the `dist/` directory, ready for deployment to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Any CDN that supports static files
- **Traditional Servers**: Apache, Nginx, etc.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is [Apache License, Version 2.0](LICENSE) licensed.

---

**Made with ❤️ by [k1lgor](https://github.com/k1lgor)**
