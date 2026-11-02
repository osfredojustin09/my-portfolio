# Justin Osfredo — Personal Developer Portfolio

A creative, interactive, and informative personal portfolio website for **Justin Osfredo**, Grade 12 high school student and aspiring software developer.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Enhancements & Features

1. **Unique Visual Identity**:
   - Modern, editorial-inspired typography and layout with high-contrast text and disciplined whitespace.
   - Distinctive dark navy/slate palette (`#0B0F17`) with crisp light mode, respecting OS preferences and storing choice in `localStorage`.
   - Subtle geometric matrix grid background using low-contrast CSS lines (no distracting or heavy effects).
   - Zero-pill metadata discipline using clean typographic separators (`·`, `/`).

2. **Engaging Hero Section**:
   - Expressive typography: *"Building Digital Experiences Through Code."*
   - Real-time **Interactive Developer Terminal** with clickable tabs (`whoami.sh`, `stack.json`, `values.ts`, `goal.md`).
   - Core tools preview (Python, JavaScript, HTML/CSS, MySQL, Git, Figma).
   - Featured project preview card with a direct **1-click "Launch Sandbox"** button.

3. **Narrative-Driven About Section**:
   - Interactive storytelling tabs:
     - **Origin Story & Passion**: How curiosity behind the screen led to software engineering.
     - **Learning Approach**: The "Build, Break, Inspect Internals, and Rebuild" methodology.
     - **Core Values**: Intellectual Curiosity, Clean Craftsmanship, Relentless Persistence, and Humility.
     - **Learning Milestones**: Chronological milestones from 2023 to 2026+.
   - **Beyond Coding**: Showcases interests in Mathematics & Logic Puzzles, Strategic Gaming & Chess, Hardware curiosity, and Peer Collaboration.
   - Profile card with clearly labeled placeholders for school, graduation year, and online profiles.

4. **Upgraded Skills Section**:
   - Organized into 6 technical categories:
     - *Frontend Development*
     - *Backend Development*
     - *Programming Languages*
     - *Database Management*
     - *Development Tools*
     - *UI/UX Design*
   - **Interactive Technology Inspector**: Clicking any technology reveals its purpose, how Justin uses/practices it, related topics, and domain context.
   - Live search input to quickly filter by keyword or technology name.
   - **Proactive Academic Roadmap**: Topics Justin is currently exploring to prepare for university computer science.

5. **Showcase Projects Section**:
   - **Featured Project Spotlight**: Spotlights the *Class Notes & Task Manager* with problem/solution breakdown, technical metrics, and instant sandbox launch.
   - Responsive project cards with problem solved, tech stack, and contribution.
   - **Tabbed Project Detail Modal**:
     - *Overview & Solution*: Problem identified, engineered solution, key features, technologies.
     - *Development Process*: 5 sequential engineering steps.
     - *Challenges & Lessons*: Technical roadblocks overcome and takeaways.
   - **Interactive Task Manager Sandbox**: Fully functional in-browser task manager with state persistence, completion toggles, and subject filters.

6. **Engineering Development Process**:
   - An interactive 5-stage lifecycle walkthrough:
     1. Identify & Understand Problem
     2. Research & Plan Architecture
     3. Wireframe & Design Solution
     4. Develop & Test Incrementally
     5. Gather Feedback & Iterate
   - Displays concrete deliverables for each stage.

7. **Goals & Recent Updates**:
   - **Short-Term Goals**: Grade 12 excellence, university CS admissions, algorithmic complexity mastery, first open-source pull request.
   - **Long-Term Goals**: Software engineering on scalable web services, community mentorship.
   - **Live Activity Feed**: Recent project milestones and learning focus.

8. **Education & Learning Journey**:
   - Verifiable timeline of high school coursework, independent developer projects, extracurricular clubs, and online tracks.

9. **Contact & Accessibility**:
   - Form validation, spam honeypot bot trap, mailto generator, and clipboard copy.
   - Direct email: `osfredojustin@gmail.com`.

10. **In-Browser Profile Customizer**:
    - Click **"Edit Profile"** in the top navigation bar to replace any placeholder live on screen and export your updated JSON!

---

## 🛠️ Updating Personal Information

All data is centralized in:
```
src/data/portfolioData.ts
```

Edit `personalInfo` to replace placeholders:
```typescript
personalInfo: {
  name: "Justin Osfredo",
  school: "Your Actual High School Name",
  graduationYear: "2026",
  githubUrl: "https://github.com/your-username",
  linkedinUrl: "https://linkedin.com/in/your-profile",
  // ...
}
```

---

## 💻 Running Locally

```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

---

## 🚀 Building for Production

```bash
npm run build
```
The optimized bundle will be generated in `dist/`.
