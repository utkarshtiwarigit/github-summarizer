# RepoLens 🔍

**RepoLens** is an AI-powered GitHub repository analyzer that helps developers understand any open-source project in seconds.

Simply paste a GitHub repository URL, and RepoLens automatically fetches the project's README, analyzes it using Google's Gemini AI, and generates a structured summary including the project's purpose, technology stack, contribution ideas, and key insights.

---

## ✨ Features

- 🤖 AI-powered repository analysis using Gemini
- 🔗 Analyze any public GitHub repository from its URL
- 📖 Automatically fetches and processes the project's README
- ⚡ Generates concise, structured summaries within seconds
- 🧠 Identifies:
  - Project overview
  - Tech stack
  - Beginner-friendly contribution ideas
  - Target audience
- 📜 Stores recent analyses using PostgreSQL
- 🎨 Modern animated UI built with Next.js and Tailwind CSS
- 🌌 Interactive landing page with custom animations

---

## 🛠 Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Google Gemini API

### Database
- PostgreSQL
- Drizzle ORM
- Neon Database

---

## 🚀 How It Works

1. Enter a GitHub repository URL.
2. RepoLens fetches the repository's README.
3. The README is sent to Gemini AI.
4. Gemini generates a structured analysis.
5. The summary is displayed in a clean interface and stored in PostgreSQL for future reference.

---

## 📸 Preview

> Add screenshots or a demo GIF here.

```
Landing Page
Analyzer Page
Generated AI Summary
```

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── db/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── App.tsx
│   ├── LandingPage.tsx
│   ├── AnalyzerPage.tsx
│   ├── MatrixBackground.tsx
│   └── CustomCursor.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/repolens.git
cd repolens
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
```

Push the database schema:

```bash
npx drizzle-kit push
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📌 Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Google Gemini API Key |
| `DATABASE_URL` | PostgreSQL connection string (Neon) |

---

## 🎯 Future Improvements

- GitHub authentication
- Repository metadata (stars, forks, issues, contributors)
- Commit history analysis
- Architecture and folder structure visualization
- Export summaries as PDF or Markdown
- AI-powered repository comparison
- Repository bookmarking and favorites

---

## 🤝 Contributing

Contributions are welcome!

Feel free to open an issue or submit a pull request to improve RepoLens.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Utkarsh Tiwari**

Built to simplify exploring open-source projects with AI.
