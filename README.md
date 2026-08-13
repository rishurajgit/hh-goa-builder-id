# 🪪 Hacker House Goa — Builder ID

A fun, interactive Builder ID card generator inspired by the Hacker House Goa 2026 aesthetic.

Users can upload their photo, enter their name, choose a builder title, add their role/tech stack, generate a personalized Builder ID card, download it as an image, and share it on X.

## 🚀 Live Demo

[Visit the live Builder ID Generator](https://hh-goa-builder-id-eta.vercel.app/)

---

## ✨ Features

- 📸 Upload a profile photo
- 👤 Enter your name
- 🧑‍💻 Add your role / tech stack
- 🎲 Randomly generate a Builder Title using the **ROLL** button
- 🪪 Generate a personalized Hacker House Builder ID
- 📥 Download the generated card as a PNG
- 𝕏 Share the Builder ID on X
- ☁️ Upload generated cards to Vercel Blob
- 🔗 Generate shareable card URLs
- 📱 Responsive design for desktop and mobile
- 🎨 Hacker House Goa inspired visual design

---

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **CSS**

### Storage

- **Vercel Blob**

### Deployment

- **Vercel**

### Version Control

- **Git**
- **GitHub**

---

## ⚙️ Getting Started

### 1. Clone the repository
- git clone https://github.com/rishurajgit/hh-goa-builder-id.git

### 2. Navigate into the project
- cd hh-goa-builder-id

### 3. Install dependencies
- npm install

### 4. Configure environment variables
- Create a .env.local file in the project root.

- BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
-Never commit .env.local or expose your Blob credentials publicly.

### 5. Start the development server
- npm run dev

## Open:
- http://localhost:3000

## ☁️ Vercel Blob Setup

- The application uses Vercel Blob to store generated Builder ID cards.

The upload API is located at:
- app/api/upload-card/route.ts

The API receives the generated card image and uploads it to the configured Blob store.

Generated files are stored using a structure similar to:

- builder-cards/{id}.png

The Blob store is configured through Vercel and its environment variables.

# 🪪 How It Works
### 1. Upload a photo

- The user selects a JPG, PNG, WebP, or HEIC image.

### 2. Enter details

- The user provides:

- Name
- Builder Title
- Role / Stack
### 3. Generate the Builder ID

- The information is dynamically rendered onto the Builder ID card.

### 4. Download

- The generated card can be downloaded locally as a PNG image.

### 5. Share on X

- The application uploads the generated Builder ID to Vercel Blob and creates a publicly accessible image URL.

- The user can then share the Builder ID through X.

# 🌐 Deployment

### The project is deployed using Vercel.

- Deploy through GitHub
- Push the project to GitHub.
- Import the repository into Vercel.
- Select Next.js as the framework.
- Add the required environment variables.
- Deploy.

- Every new push to the connected GitHub branch can trigger a new Vercel deployment.


# 👨‍💻 Author

# Rishu Raj
- GitHub: @rishurajgit
