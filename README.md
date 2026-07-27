RepoLens is a full-stack AI application that analyzes public GitHub repositories by extracting and interpreting project documentation. It generates structured technical summaries that help developers quickly understand a repository's purpose, technology stack, architecture, and contribution workflow without manually reading extensive documentation.

The application also maintains a history of analyzed repositories using PostgreSQL, allowing previously generated summaries to be revisited without repeating the analysis.

---

## Core Architecture

- Built as a full-stack Next.js application with React and TypeScript.
- Uses Next.js API Routes to orchestrate repository retrieval, AI inference, and database operations.
- Persists repository analyses in PostgreSQL using Drizzle ORM and Neon Database.
- Designed with a modular component architecture separating the landing page, analysis workflow, animated UI, and reusable visual components.

---

## Technical Highlights

- Automatic retrieval of README files from public GitHub repositories.
- AI-generated repository summaries using the Google Gemini API.
- Markdown parsing and rendering for structured presentation of generated analyses.
- Persistent storage of previously analyzed repositories.
- Responsive interface with custom animated transitions and reusable UI components.

---

## Technology Stack

| Layer | Technologies |
|--------|--------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| AI | Google Gemini API |
| Database | PostgreSQL, Drizzle ORM, Neon |
| Tooling | ESLint, npm |

---

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/utkarshtiwarigit/github-summarizer.git
cd github-summarizer
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
GOOGLE_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

Apply the database schema:

```bash
npx drizzle-kit push
```

Start the development server:

```bash
npm run dev
```

---

## Future Work

- Repository metadata analysis (stars, forks, issues, contributors)
- Commit history summarization
- Repository architecture visualization
- PDF and Markdown export
- Authentication and saved collections

---
