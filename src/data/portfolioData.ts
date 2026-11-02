export interface Project {
  id: string;
  title: string;
  category: 'Web Development' | 'Applications' | 'UI/UX Design' | 'Data & Programming';
  statusLabel: string; // e.g. "Interactive Web Application", "Frontend Prototype", "UI Concept & Wireframe"
  isExample: boolean;
  featured?: boolean;
  tagline: string;
  description: string;
  problemSolved: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  roleAndContribution: string;
  developmentProcess: string[];
  learningOutcomes: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  image: string;
  challenges: string;
  lessonsLearned: string;
  date: string;
  metrics?: { label: string; value: string }[];
}

export type SkillCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Programming Languages'
  | 'Database Management'
  | 'Development Tools'
  | 'UI/UX Design';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  status: 'Used in Projects' | 'Familiar' | 'Learning';
  purpose: string;
  howUsedOrLearned: string;
  tags: string[];
}

export interface TimelineEntry {
  id: string;
  type: 'Education' | 'Coursework' | 'Projects' | 'Extracurricular' | 'Certificates';
  period: string;
  title: string;
  institutionOrContext: string;
  description: string;
  skillsAcquired: string[];
  isVerified: boolean;
}

export interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface GoalItem {
  horizon: 'Short-Term (High School to Uni)' | 'Long-Term (Industry & Beyond)';
  title: string;
  description: string;
  targetYear: string;
  status: 'In Progress' | 'Planned';
}

export interface ActivityUpdate {
  date: string;
  badge: string;
  title: string;
  summary: string;
}

export interface PersonalInfo {
  name: string;
  greeting: string;
  statusLabel: string;
  headline: string;
  tagline: string;
  shortIntro: string;
  aboutBio: string;
  originStory: string;
  learningApproach: string;
  personalValues: { title: string; desc: string }[];
  educationLevel: string;
  school: string;
  graduationYear: string;
  fieldOfInterest: string;
  currentFocus: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl?: string;
  avatarUrl?: string;
  whatDrivesMe: {
    title: string;
    description: string;
  }[];
  beyondCoding: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const initialPortfolioData: {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  currentlyLearning: { title: string; area: string; description: string; progress: string }[];
  projects: Project[];
  timeline: TimelineEntry[];
  milestones: Milestone[];
  developmentProcess: { step: string; title: string; desc: string; deliverables: string }[];
  goals: GoalItem[];
  latestUpdates: ActivityUpdate[];
} = {
  personalInfo: {
    name: "Justin Osfredo",
    avatarUrl: "", // Leave empty for clearly labeled placeholder, or customizable via upload/URL
    greeting: "Hi, I'm Justin Osfredo",
    statusLabel: "High School Student · Aspiring Software Developer",
    headline: "Building Digital Experiences Through Code",
    tagline: "Bridging curiosity, structured logic, and modern web technologies into practical software solutions.",
    shortIntro:
      "Grade 12 student in Indonesia passionate about computer science, software engineering, and logical problem-solving. Constantly tinkering with code, dissecting algorithms, and preparing for future university IT studies.",
    aboutBio:
      "I am a Grade 12 high school student with a genuine fascination for Information Technology, programming, and software engineering. Rather than treating computers purely as consumer tools, I enjoy looking beneath the surface—understanding how data flows across networks, how algorithms optimize solutions, and how clean code creates intuitive digital tools for everyday challenges.",
    originStory:
      "My journey started when I grew curious about how websites and games were actually made behind the screen. Writing my first lines of code and seeing them immediately render in the browser sparked an obsession with building. I soon started using code to organize school tasks and automate repetitive study routines.",
    learningApproach:
      "I prioritize hands-on experimentation over passive reading. When learning a new concept—like relational database schemas or asynchronous JavaScript—I build small prototypes, break them to observe failure states, read official documentation, and rebuild them cleanly from scratch.",
    personalValues: [
      {
        title: "Intellectual Curiosity",
        desc: "Always asking 'why does it work this way?' before settling for convenient copy-paste solutions."
      },
      {
        title: "Clean Craftsmanship",
        desc: "Writing readable, maintainable, and well-structured code with sensible naming conventions."
      },
      {
        title: "Relentless Persistence",
        desc: "Embracing debugging as a natural detective puzzle rather than a frustrating barrier."
      },
      {
        title: "Humility & Openness",
        desc: "Recognizing that learning in tech is infinite, welcoming critique, and continuously iterating."
      }
    ],
    educationLevel: "Grade 12 Senior High School",
    school: "[Insert actual school name]",
    graduationYear: "[Insert expected graduation year]",
    fieldOfInterest: "Information Technology and Software Development",
    currentFocus: "[Insert current learning focus, e.g. Data Structures & Modern Web]",
    location: "Indonesia",
    email: "osfredojustin@gmail.com",
    githubUrl: "[Insert actual GitHub profile URL]",
    linkedinUrl: "[Insert actual LinkedIn profile URL]",
    instagramUrl: "[Insert actual public professional profile URL, optional]",
    whatDrivesMe: [
      {
        title: "Logical Problem-Solving",
        description: "Breaking down ambiguous challenges into modular steps, clear algorithms, and verifiable test cases."
      },
      {
        title: "Continuous Independent Learning",
        description: "Exploring official documentation, open-source libraries, and computer science courses outside of classroom requirements."
      },
      {
        title: "Empowering Everyday People",
        description: "Using software to eliminate tedious friction, whether helping peers track homework or showcasing local businesses."
      },
      {
        title: "Creative Technology",
        description: "Combining clean user interface design with sound engineering logic so software is both pleasing and dependable."
      }
    ],
    beyondCoding: [
      {
        title: "Mathematics & Logic Puzzles",
        description: "Exploring mathematical reasoning, probability, and discrete logic that reinforce computational thinking.",
        icon: "Calculator"
      },
      {
        title: "Strategic Gaming & Chess",
        description: "Enjoying strategy games that require positional evaluation, forward calculation, and structured decision trees.",
        icon: "Trophy"
      },
      {
        title: "Technology Community & Hardware",
        description: "Keeping up with computing architectures, modern gadget teardowns, and developer community updates.",
        icon: "Cpu"
      },
      {
        title: "Peer Collaboration & Study Groups",
        description: "Collaborating with high school peers on project presentations, group assignments, and science discussions.",
        icon: "Users"
      }
    ]
  },

  skills: [
    // Frontend Development
    {
      name: "HTML5",
      category: "Frontend Development",
      status: "Used in Projects",
      purpose: "Semantic markup, modern layout scaffolding, form elements, and web accessibility standards.",
      howUsedOrLearned: "Applied extensively across responsive landing pages and web apps to ensure valid DOM hierarchy.",
      tags: ["Semantic HTML", "Accessibility", "SEO"]
    },
    {
      name: "CSS3 & Modern Layouts",
      category: "Frontend Development",
      status: "Used in Projects",
      purpose: "Styling interfaces using CSS Grid, Flexbox, CSS variables, transitions, and media queries.",
      howUsedOrLearned: "Built responsive layouts from scratch and adapted utility-first CSS frameworks like Tailwind.",
      tags: ["Flexbox", "CSS Grid", "Responsive Design", "Tailwind CSS"]
    },
    {
      name: "JavaScript (ES6+)",
      category: "Frontend Development",
      status: "Used in Projects",
      purpose: "Client-side interactivity, DOM manipulation, asynchronous fetch operations, and modular logic.",
      howUsedOrLearned: "Developed event handlers, client-side filtering algorithms, and local storage state managers.",
      tags: ["Async/Await", "DOM API", "JSON", "ES Modules"]
    },

    // Backend Development
    {
      name: "PHP",
      category: "Backend Development",
      status: "Learning",
      purpose: "Server-side scripting, handling form submissions, session handling, and basic server logic.",
      howUsedOrLearned: "Studying fundamentals of request/response lifecycles, GET/POST routing, and backend processing.",
      tags: ["Server Scripting", "HTTP Requests", "Backend Logic"]
    },
    {
      name: "REST API Concepts",
      category: "Backend Development",
      status: "Learning",
      purpose: "Designing and consuming standard JSON APIs for client-server communication.",
      howUsedOrLearned: "Experimenting with fetching public APIs and structuring endpoints for frontend consumers.",
      tags: ["REST", "JSON Payloads", "Status Codes"]
    },

    // Programming Languages
    {
      name: "Python",
      category: "Programming Languages",
      status: "Familiar",
      purpose: "General-purpose programming, algorithmic problem-solving, and simple automation scripts.",
      howUsedOrLearned: "Solved competitive coding exercises, implemented sorting algorithms, and automated file tasks.",
      tags: ["Data Structures", "Algorithms", "Automation", "Math"]
    },
    {
      name: "JavaScript",
      category: "Programming Languages",
      status: "Used in Projects",
      purpose: "Universal application programming across web browsers and runtime environments.",
      howUsedOrLearned: "Primary language for client-side applications, interactive widgets, and state handling.",
      tags: ["Event Loop", "Functions", "Objects", "ES6"]
    },

    // Database Management
    {
      name: "MySQL",
      category: "Database Management",
      status: "Familiar",
      purpose: "Relational database management, table schema design, and relational integrity.",
      howUsedOrLearned: "Learned schema design principles, primary keys, foreign keys, and normalized database structures.",
      tags: ["Relational DB", "Schema Design", "Normalization"]
    },
    {
      name: "SQL Fundamentals",
      category: "Database Management",
      status: "Used in Projects",
      purpose: "Querying, filtering, aggregating, inserting, and updating data records in relational tables.",
      howUsedOrLearned: "Authored queries involving SELECT, JOIN, WHERE, GROUP BY, and subqueries in coursework exercises.",
      tags: ["Data Querying", "Joins", "Aggregation", "CRUD"]
    },

    // Development Tools
    {
      name: "Git",
      category: "Development Tools",
      status: "Used in Projects",
      purpose: "Distributed version control system to track changes, commit code, and manage branches.",
      howUsedOrLearned: "Daily usage for committing incremental progress, experimenting in feature branches, and rollbacks.",
      tags: ["Version Control", "Branching", "Commit Discipline"]
    },
    {
      name: "GitHub",
      category: "Development Tools",
      status: "Used in Projects",
      purpose: "Cloud code hosting, open-source portfolio publishing, issue tracking, and repository sharing.",
      howUsedOrLearned: "Host code repositories, manage README documentation, and review open-source repositories.",
      tags: ["Code Hosting", "Collaboration", "Open Source"]
    },
    {
      name: "Visual Studio Code",
      category: "Development Tools",
      status: "Used in Projects",
      purpose: "Primary development environment configured with linters, syntax tools, and integrated terminal.",
      howUsedOrLearned: "Configured tailored workspace shortcuts, extensions (Prettier, ESLint), and terminal workflows.",
      tags: ["Editor", "Extensions", "Terminal Workflow"]
    },

    // UI/UX Design
    {
      name: "Figma",
      category: "UI/UX Design",
      status: "Familiar",
      purpose: "Interface wireframing, high-fidelity UI design, user journey mapping, and component systems.",
      howUsedOrLearned: "Created interactive wireframes and UI designs before writing frontend code to clarify user flows.",
      tags: ["Wireframing", "Auto-layout", "Design Tokens", "Prototyping"]
    },
    {
      name: "UI/UX Principles",
      category: "UI/UX Design",
      status: "Familiar",
      purpose: "Information architecture, visual hierarchy, typography scales, and accessible contrast ratios.",
      howUsedOrLearned: "Studying WCAG accessibility guidelines, mobile ergonomics, and clean minimalist layouts.",
      tags: ["Hierarchy", "Contrast", "Whitespace", "Ergonomics"]
    }
  ],

  currentlyLearning: [
    {
      title: "Data Structures & Algorithm Complexity",
      area: "Computer Science Foundations",
      description: "Analyzing Big-O time and space complexity, recursion, search algorithms, stacks, queues, and tree traversal.",
      progress: "In Progress · Practicing on problems"
    },
    {
      title: "Modern React & Component Patterns",
      area: "Frontend Architecture",
      description: "Mastering hooks (useState, useEffect, useMemo), custom reusable hooks, and unidirectional data flow.",
      progress: "In Progress · Building interactive projects"
    },
    {
      title: "Backend API Engineering & Databases",
      area: "Full-Stack Development",
      description: "Learning how client applications communicate securely with backends via HTTP REST endpoints and database queries.",
      progress: "Exploring · Self-directed courses"
    }
  ],

  projects: [
    {
      id: "student-productivity-dashboard",
      title: "Student Productivity Dashboard",
      category: "Web Development",
      statusLabel: "Interactive Web Application / Featured",
      isExample: false,
      featured: true,
      tagline: "A centralized academic operating system combining task management, study calendar, analytics, and Pomodoro focus sessions.",
      description:
        "A modern productivity web application designed to help high school and university students organize academic activities, manage assignments across subjects, schedule study time-blocks, and monitor learning habits in one cohesive dashboard.",
      problemSolved:
        "Students often struggle to manage assignments, deadlines, and study schedules across fragmented paper notes, chat groups, or complex enterprise tools that distract from actual learning.",
      solution:
        "Engineered a unified, distraction-free student dashboard inspired by Notion and Linear, combining intuitive assignment tracking, monthly calendar scheduling, dynamic analytics, and a Pomodoro study timer with local storage persistence.",
      technologies: [
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Browser LocalStorage API",
        "Web Audio API",
        "Data Visualization"
      ],
      keyFeatures: [
        "Full Task CRUD with subject categorization, priority flags, and search/filtering",
        "Interactive Study Planner with monthly calendar grid and focus session time-blocks",
        "Productivity Analytics tracking completion rate, weekly study hours, and subject trends",
        "Built-in Pomodoro Study Timer with circular progress ring and harmonic audio chimes",
        "Offline browser persistence with JSON backup export and demo data controls"
      ],
      roleAndContribution:
        "Sole software developer & UI designer: Conceived product architecture, designed clean card-based interface, developed state persistence layer, built SVG data visualizations, and implemented the Web Audio Pomodoro timer.",
      developmentProcess: [
        "Step 1: Analyzed daily student workflow hurdles across high school coursework and study deadlines.",
        "Step 2: Designed clean card-based information architecture inspired by Notion and Linear with dark/light themes.",
        "Step 3: Implemented state management and localStorage persistence for assignments, study sessions, and user preferences.",
        "Step 4: Built interactive SVG analytics charts and a circular countdown timer with synthesized Web Audio chimes.",
        "Step 5: Rigorously tested responsive navigation across mobile and desktop displays to ensure zero layout shift."
      ],
      learningOutcomes: [
        "Demonstrated mastery of complex multi-view application architecture and state synchronization in React",
        "Implemented resilient client-side data persistence with JSON export and recovery routines",
        "Designed accessible, high-contrast dashboard data visualizations that recalculate dynamically from real user actions",
        "Strengthened practical frontend problem-solving by building an everyday tool students can genuinely use"
      ],
      githubUrl: "[Insert actual GitHub repository link]",
      liveDemoUrl: "#student-dashboard",
      image: "/src/assets/images/project_productivity_dashboard_1793584545610.jpg",
      challenges:
        "Coordinating multi-entity state updates (assignments, calendar sessions, timer logs) so that analytical charts and progress gauges immediately reflect changes without performance lag.",
      lessonsLearned:
        "Structuring application state with modular types and reactive event loops makes full-stack feature expansion intuitive and ensures offline reliability.",
      date: "2025",
      metrics: [
        { label: "Architecture", value: "React + TS + LocalStorage" },
        { label: "Core Modules", value: "Tasks · Calendar · Analytics · Timer" },
        { label: "Status", value: "Live Functional App" }
      ]
    },
    {
      id: "class-notes-task-manager",
      title: "Class Notes & Task Manager",
      category: "Applications",
      statusLabel: "Interactive Web Application",
      isExample: true,
      featured: false,
      tagline: "A student-tailored productivity dashboard for managing homework deadlines and quick revision notes.",
      description:
        "A student-centric web application designed to help high school peers organize course notes, monitor homework deadlines, and eliminate study friction. Features an interactive sandbox right inside this portfolio.",
      problemSolved:
        "High school students often juggle homework across 8+ subjects using fragmented paper notes or over-complicated enterprise productivity apps that distract from actual study.",
      solution:
        "Engineered a lightweight, distraction-free web dashboard with subject-based filtering, urgency indicators, and zero-server local storage persistence for instant offline reliability.",
      technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Browser LocalStorage API"],
      keyFeatures: [
        "Create, read, filter, and delete study notes and tasks",
        "Subject-based color coding (Computer Science, Math, Physics, General)",
        "Instant completion toggle with persistent local storage saving",
        "Live interactive demo sandbox directly runnable in the browser",
        "Accessible keyboard navigation and high-contrast status feedback"
      ],
      roleAndContribution:
        "Sole creator & architect: Designed data model, built CRUD state routines, styled clean responsive UI, and handled edge-case local storage errors.",
      developmentProcess: [
        "Step 1: Surveyed classmates on their biggest pain points with managing school deadlines.",
        "Step 2: Sketched paper wireframes prioritizing single-click task completion and rapid task entry.",
        "Step 3: Implemented data structures with unique IDs, timestamping, and completion booleans.",
        "Step 4: Built the user interface with clean typography and real-time state synchronization.",
        "Step 5: Tested on mobile and desktop viewports to ensure zero layout shift."
      ],
      learningOutcomes: [
        "Gained deep hands-on expertise in state management and JSON serialization in client-side JS",
        "Learned how to design clean UI feedback loops for user actions without page reloads",
        "Understood the value of building software to solve personal everyday frustrations"
      ],
      githubUrl: "[Insert actual GitHub repository link]",
      liveDemoUrl: "#interactive-demo",
      image: "/src/assets/images/project_notes_manager_1792557344847.jpg",
      challenges:
        "Maintaining seamless state synchronization without requiring page refreshes, and handling empty state gracefully when all tasks are finished.",
      lessonsLearned:
        "Separating the state management layer from DOM manipulation code drastically reduced bugs and made feature expansion straightforward.",
      date: "2025",
      metrics: [
        { label: "Storage", value: "Offline LocalStorage" },
        { label: "Latency", value: "<10ms Instant UI" },
        { label: "Status", value: "Functional Sandbox" }
      ]
    },
    {
      id: "coffee-shop-website",
      title: "Artisanal Coffee Roasters Website",
      category: "Web Development",
      statusLabel: "Frontend Prototype / Demo",
      isExample: true,
      featured: false,
      tagline: "A responsive brand showcase and digital menu crafted for a local specialty coffee roastery.",
      description:
        "A responsive commercial showcase website crafted for a fictional artisanal coffee shop, highlighting ethically sourced blends, interactive beverage menus, and brand heritage.",
      problemSolved:
        "Small local businesses frequently lose potential customers due to slow, unoptimized, or non-mobile-friendly websites that fail to communicate menu offerings clearly.",
      solution:
        "Built a modern, mobile-first responsive website with clear visual hierarchy, categorized coffee menus, interactive buttons, and accessible brand storytelling.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Mobile-First"],
      keyFeatures: [
        "Fully responsive navigation bar with mobile touch drawer",
        "Interactive beverage & bean catalog with visual category filters",
        "Brand storytelling section detailing origin, roast profiles, and ethics",
        "Operational hours, location map anchor, and responsive contact form mockup"
      ],
      roleAndContribution:
        "Sole front-end developer: Designed layout structure, wrote semantic HTML5, created custom CSS styling with Flexbox and Grid, and programmed DOM interactivity.",
      developmentProcess: [
        "Researched modern specialty food & beverage landing pages for aesthetic inspiration.",
        "Structured semantic HTML layout using landmark tags (<header>, <main>, <section>, <footer>).",
        "Authored CSS Grid styles for the product showcase to automatically adapt to screen widths.",
        "Added vanilla JavaScript for smooth scrolling and interactive mobile navigation toggling."
      ],
      learningOutcomes: [
        "Mastered fluid CSS Grid and Flexbox techniques across mobile (360px) and wide (1440px) viewports",
        "Practiced typographic hierarchy and negative space to convey a premium artisanal brand feel",
        "Refined vanilla JS DOM event handling practices without relying on external libraries"
      ],
      githubUrl: "[Insert actual GitHub repository link]",
      liveDemoUrl: "#demo-preview",
      image: "/src/assets/images/project_coffee_shop_1792557344893.jpg",
      challenges:
        "Preventing image layout shifts and ensuring menu card text wraps gracefully on narrow smartphone displays.",
      lessonsLearned:
        "Designing with a mobile-first philosophy simplifies CSS rules and prevents complex desktop-to-mobile overrides.",
      date: "2025",
      metrics: [
        { label: "Responsiveness", value: "360px - 4K" },
        { label: "Framework", value: "Vanilla HTML/CSS/JS" },
        { label: "Status", value: "Frontend Demo" }
      ]
    },
    {
      id: "library-ui-design",
      title: "Digital Library Management Platform",
      category: "UI/UX Design",
      statusLabel: "UI/UX Concept & Prototype",
      isExample: true,
      featured: false,
      tagline: "A modern, human-centered UI/UX prototype created in Figma for school library book discovery and borrowing.",
      description:
        "A comprehensive UI/UX design prototype created in Figma for a contemporary library catalog system, focusing on intuitive book search, status tracking, and reservation queues.",
      problemSolved:
        "Traditional library catalog search portals are often clunky, visually outdated, and difficult for students to browse efficiently on mobile devices or tablets.",
      solution:
        "Designed an approachable visual catalog with clear book cover cards, real-time availability badges, reader reviews, and a 2-step reservation workflow.",
      technologies: ["Figma", "UI/UX Design", "Wireframing", "Component Systems", "Design Tokens"],
      keyFeatures: [
        "Student overview dashboard showing active loans and return due dates",
        "Visual catalog with faceted genre, author, and availability filtering",
        "Detailed modal view with book synopsis, ISBN, and shelf location",
        "User-tested reservation checkout flow with minimal clicks"
      ],
      roleAndContribution:
        "Product & UI designer: Conducted informal interviews with high school peers, drew paper wireframes, and constructed high-fidelity Figma components with auto-layout.",
      developmentProcess: [
        "Gathered feedback from classmates on why they rarely use the school library catalog.",
        "Created low-fidelity sketches exploring card vs list representations for book results.",
        "Constructed design token system (color variables, font scales, spacing increments) in Figma.",
        "Assembled interactive prototype frames with simulated click journeys."
      ],
      learningOutcomes: [
        "Learned how structured component design libraries translate into real frontend development",
        "Applied WCAG AA contrast standards to ensure all book information is accessible",
        "Discovered that good software starts with understanding user pain points before writing code"
      ],
      githubUrl: "[Insert Figma prototype link]",
      liveDemoUrl: undefined,
      image: "/src/assets/images/project_library_concept_1792557346199.jpg",
      challenges:
        "Balancing dense book metadata (author, genre, edition, location) without making the mobile view visually overwhelming.",
      lessonsLearned:
        "Using collapsible metadata and thoughtful visual hierarchy allows users to scan titles quickly while accessing details on demand.",
      date: "2024",
      metrics: [
        { label: "Tool", value: "Figma Component System" },
        { label: "Discipline", value: "Product UI/UX" },
        { label: "Status", value: "Design Prototype" }
      ]
    }
  ],

  timeline: [
    {
      id: "timeline-1",
      type: "Education",
      period: "2023 - Present",
      title: "Senior High School (Grade 12)",
      institutionOrContext: "[Insert actual school name], Indonesia",
      description:
        "Currently completing final year of senior high school education with strong academic focus on Mathematics, Natural Sciences, and Information Technology subjects. Expected graduation: [Insert expected graduation year].",
      skillsAcquired: ["Logical Reasoning", "Advanced Mathematics", "Analytical Thinking", "Peer Collaboration"],
      isVerified: true
    },
    {
      id: "timeline-2",
      type: "Coursework",
      period: "2024 - 2025",
      title: "Academic & Independent Computer Science Studies",
      institutionOrContext: "School Curriculum & Self-Directed Exploration",
      description:
        "Studying core programming fundamentals, data representation, boolean algebra, algorithmic logic, and web foundations. Consistently testing classroom theory with working code.",
      skillsAcquired: ["Algorithmic Problem-Solving", "Data Representation", "Code Syntax Mastery"],
      isVerified: true
    },
    {
      id: "timeline-3",
      type: "Projects",
      period: "2024 - 2025",
      title: "Independent Software Projects & Prototypes",
      institutionOrContext: "Self-Driven Coding Experiments",
      description:
        "Created practical tools including the Class Notes & Task Manager web app, responsive websites, and Figma UI prototypes. Emphasized clean code organization and real usability.",
      skillsAcquired: ["HTML5 / CSS3", "JavaScript (ES6)", "Git & GitHub", "Figma UI Prototyping"],
      isVerified: true
    },
    {
      id: "timeline-4",
      type: "Extracurricular",
      period: "2023 - Present",
      title: "School Club & Technology Activities",
      institutionOrContext: "[Insert actual school club or committee, e.g. Computer / Science Club]",
      description:
        "Active member of school student community, collaborating with peers on collaborative school projects, presentations, and technology discussions.",
      skillsAcquired: ["Public Speaking", "Team Coordination", "Event Planning"],
      isVerified: false
    },
    {
      id: "timeline-5",
      type: "Certificates",
      period: "Ongoing",
      title: "Self-Paced Computer Science & Web Modules",
      institutionOrContext: "[Insert completed or in-progress online courses, e.g. CS50 / freeCodeCamp]",
      description:
        "Pursuing structured self-study through recognized online computer science courses in Python, Web Development, and Database management.",
      skillsAcquired: ["Self-Directed Research", "Technical Documentation", "Persistence"],
      isVerified: false
    }
  ],

  milestones: [
    {
      year: "2023",
      title: "Discovering an Interest in Technology",
      subtitle: "The awakening: looking beneath consumer software",
      description: "Grew curious about how software, websites, and games operate behind the screen. Started reading technology articles and exploring computer architecture basics."
    },
    {
      year: "2023 - 2024",
      title: "Beginning Programming Fundamentals",
      subtitle: "First lines of code in Python & algorithmic logic",
      description: "Wrote first scripts in Python, mastering loops, conditional logic, functions, and structured problem-solving through hands-on coding exercises."
    },
    {
      year: "2024",
      title: "Learning Web Development",
      subtitle: "Mastering HTML5, CSS3, & Modern JavaScript (ES6+)",
      description: "Transitioned to building for the web. Learned DOM manipulation, asynchronous promises, flexbox/grid layout design, and mobile-first responsive interfaces."
    },
    {
      year: "2024 - 2025",
      title: "Building Personal Projects",
      subtitle: "Creating solutions for real academic & community needs",
      description: "Developed the Class Notes & Task Manager and responsive community prototypes. Learned to handle client-side persistence and zero-refresh state updates."
    },
    {
      year: "2025",
      title: "Exploring Software Development & Databases",
      subtitle: "Student Productivity Dashboard & Relational Data",
      description: "Architected the full Student Productivity Dashboard with assignment CRUD, Pomodoro study timer with Web Audio API, monthly calendar planner, and MySQL schema designs."
    },
    {
      year: "2025 - 2026",
      title: "Developing Advanced Technical Skills",
      subtitle: "Data structures, algorithms & strict TypeScript",
      description: "Focusing on Big-O algorithmic efficiency, binary trees, recursion, component modularity, and strict TypeScript patterns without shortcuts."
    },
    {
      year: "2026+",
      title: "Future Learning Goals & Higher Education",
      subtitle: "University Computer Science / IT admission & open source",
      description: "Pursuing admission to a top university Computer Science program, seeking merit scholarships, and preparing for future software engineering internships."
    }
  ],

  developmentProcess: [
    {
      step: "01",
      title: "Identify & Understand Problem",
      desc: "Start with a real need or friction point. Ask who the user is, what hurdle they face, and whether software is the right solution.",
      deliverables: "Problem statement, target user profile, core functional requirements"
    },
    {
      step: "02",
      title: "Research & Plan Architecture",
      desc: "Decompose the challenge into manageable modules. Select appropriate technologies, research algorithms, and plan data structures.",
      deliverables: "Data schema sketch, technology stack selection, component breakdown"
    },
    {
      step: "03",
      title: "Wireframe & Design Solution",
      desc: "Sketch user flows and wireframe layouts in Figma or notebook. Focus on visual hierarchy, accessibility, and clear touch targets.",
      deliverables: "Low/high-fidelity wireframes, UI interaction map, color & type tokens"
    },
    {
      step: "04",
      title: "Develop & Test Incrementally",
      desc: "Write clean, modular code in feature branches. Test edge cases, handle network and storage errors, and ensure responsiveness across viewports.",
      deliverables: "Functional code repository, unit logic tests, mobile responsive layout"
    },
    {
      step: "05",
      title: "Gather Feedback & Iterate",
      desc: "Share working prototypes with peers. Collect constructive criticism, diagnose UX confusion, and optimize code performance.",
      deliverables: "Refactored codebase, improved usability, documented lessons learned"
    }
  ],

  goals: [
    {
      horizon: "Short-Term (High School to Uni)",
      title: "Excel in Grade 12 & University Admissions",
      description: "Complete senior high school with distinction and secure admission into a competitive Computer Science or Information Technology university program.",
      targetYear: "2026",
      status: "In Progress"
    },
    {
      horizon: "Short-Term (High School to Uni)",
      title: "Master Data Structures & Algorithms",
      description: "Deepen understanding of classic data structures, search algorithms, and computational complexity to build strong theoretical foundations.",
      targetYear: "2025 - 2026",
      status: "In Progress"
    },
    {
      horizon: "Short-Term (High School to Uni)",
      title: "First Open-Source Contribution",
      description: "Contribute meaningful documentation fixes, bug patches, or utility modules to open-source developer repositories on GitHub.",
      targetYear: "2026",
      status: "Planned"
    },
    {
      horizon: "Long-Term (Industry & Beyond)",
      title: "Software Engineer Building Real-World Solutions",
      description: "Work as an engineer on scalable web and cloud systems that solve genuine problems for businesses and communities.",
      targetYear: "2029+",
      status: "Planned"
    },
    {
      horizon: "Long-Term (Industry & Beyond)",
      title: "Mentorship & Community Sharing",
      description: "Give back to junior students and aspiring programmers through workshops, open-source projects, and technical writing.",
      targetYear: "Future",
      status: "Planned"
    }
  ],

  latestUpdates: [
    {
      date: "Latest Update",
      badge: "Milestone",
      title: "Class Notes & Task Manager Interactive Demo",
      summary: "Integrated a live browser sandbox for the Task Manager project directly inside this portfolio website."
    },
    {
      date: "Recent Focus",
      badge: "Learning",
      title: "Deepening Data Structures & Complexity",
      summary: "Currently studying Big-O notation, binary search trees, and hash maps to prepare for computer science courses."
    },
    {
      date: "Ongoing",
      badge: "Portfolio",
      title: "Portfolio Refinements for University Applications",
      summary: "Refining project documentation, design architecture, and verifiable learning records for upcoming university reviews."
    }
  ]
};
