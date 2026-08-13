# Hacker House Goa Builder 🌴

A full-stack Next.js web application built as part of the Hacker House Goa (HHGoa'26) selection and development process. This project features a modern web interface, card uploading capabilities, and dynamic sharing features.

## 🚀 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** CSS / PostCSS / Tailwind CSS (Configured via `postcss.config.mjs`)
*   **Linting:** ESLint (`eslint.config.mjs`)

## 📁 Project Structure

The application follows the Next.js App Router architecture:

*   `app/page.tsx`: The main landing page of the application.
*   `app/api/upload-card/route.ts`: API endpoint handling secure card/image uploads.
*   `app/share/[id]/page.tsx`: Dynamic route for viewing and sharing unique generated content.
*   `public/`: Static assets including icons (`file.svg`, `globe.svg`, `window.svg`).
*   `AGENTS.md` / `CLAUDE.md`: Documentation and instructions for AI agents and assistants.

## 🛠️ Getting Started

First, ensure you have Node.js installed on your machine. Then, follow these steps to run the development server:

1. **Clone the repository and navigate into the project directory:**
   ```bash
   cd hh-goa-builder
Install the dependencies:

Bash
npm install
# or
yarn install
# or
pnpm install
Run the development server:

Bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open your browser:
Navigate to http://localhost:3000 to see the application running.

🔗 Key Features
API Integration: Dedicated backend routes for processing uploads seamlessly.

Dynamic Routing: Shareable links generated via Next.js dynamic routes (/share/[id]).

Fully Typed: End-to-end type safety using TypeScript.

👨‍💻 Author
Rishu Raj
