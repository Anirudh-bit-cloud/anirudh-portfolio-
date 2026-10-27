export interface Project {
  number: string;
  id: string;
  title: string;
  year: string;
  tagline: string;
  problem: string;
  built: string;
  outcome: string;
  metricBadge: string;
  category: "Machine Learning" | "Data Science & AI" | "Full-Stack Web";
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  architecture: {
    frontend?: string;
    backend?: string;
    model?: string;
    database?: string;
  };
}

export interface ExperienceItem {
  number: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  tools: string[];
}

export const PERSONAL = {
  name: "Anirudh Saini",
  role: "Machine Learning & Software Engineer",
  tagline: "I build predictive models that solve concrete problems, backed by reliable web systems.",
  currently: "Trainee at C-DAC MEPZ & 3rd-year CSE at SRMIST (8.70 CGPA)",
  location: "Chennai / Lucknow, India",
  timezone: "Asia/Kolkata",
  coordinates: "13.0827° N, 80.2707° E",
  email: "sainianirudh03march@gmail.com",
  phone: "+91-7267950321",
  socials: {
    github: "https://github.com/Anirudh-bit-cloud",
    linkedin: "https://www.linkedin.com/in/anirudh-saini-cse",
    leetcode: "https://leetcode.com/u/Anirudh-Saini567/",
    leetcodeHandle: "Anirudh Saini567",
  },
  bio: [
    "I am a Computer Science undergraduate at SRM Institute of Science and Technology with an 8.70 CGPA. My work sits at the intersection of applied machine learning and practical full-stack engineering.",
    "Right now, I am undergoing a 400-hour industry specialization at C-DAC MEPZ in Chennai. I spend my days building end-to-end ML workflows—cleaning raw datasets, running Bayesian hyperparameter optimization with Optuna, and debugging model predictions using SHAP explainability.",
    "When I'm not tuning Scikit-learn pipelines, I build robust backends with FastAPI and Spring Boot, connect normalized MySQL schemas, and craft clean React interfaces.",
  ],
  stats: [
    { label: "Academic CGPA", value: "8.70", detail: "SRMIST B.Tech CSE (2024–2028)" },
    { label: "C-DAC Traineeship", value: "400 hrs", detail: "Industry ML specialization" },
    { label: "Model Accuracy", value: "88%", detail: "Adaptive Study Twin evaluation" },
    { label: "LeetCode Solved", value: "30+", detail: "Arrays, Binary Search, Trees, DP" },
  ],
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    id: "adaptive-study-twin",
    title: "Adaptive Study Twin",
    year: "2026",
    tagline: "Predictive personalization engine that recalculates learner pathways in real time.",
    problem:
      "Most online learning systems deliver rigid, one-size-fits-all curricula regardless of where individual students struggle or excel.",
    built:
      "A Scikit-learn classification engine integrated with an asynchronous FastAPI backend and a responsive React client. The engine continuously assesses latency, quiz performance, and topic history to re-rank upcoming study modules.",
    outcome:
      "Achieved an 88% classification accuracy on student performance validation sets, delivering sub-50ms inference responses to the React frontend.",
    metricBadge: "88% Model Accuracy",
    category: "Machine Learning",
    stack: ["Python", "FastAPI", "Scikit-learn", "React.js", "NumPy", "Pandas"],
    githubUrl: "https://github.com/Anirudh-bit-cloud",
    liveUrl: "https://github.com/Anirudh-bit-cloud",
    architecture: {
      frontend: "React client with dynamic quiz states and progress visualizations",
      backend: "Asynchronous FastAPI microservice with automated OpenAPI docs",
      model: "Supervised Scikit-learn classification model with feature preprocessing",
      database: "Session state persistence and evaluation caching",
    },
  },
  {
    number: "02",
    id: "thinklytics",
    title: "Thinklytics",
    year: "2026",
    tagline: "Automated tabular data analysis platform with Bayesian HPO and explainable AI.",
    problem:
      "Hyperparameter tuning and model explainability often require repetitive boilerplate, leaving non-specialists with black-box models.",
    built:
      "An automated ML pipeline using Optuna for Bayesian hyperparameter search space reduction and SHAP (SHapley Additive exPlanations) for local and global model interpretability.",
    outcome:
      "Decreased tuning iteration time across structured datasets by over 40% while generating transparent feature importance plots.",
    metricBadge: "Explainable AI (SHAP)",
    category: "Data Science & AI",
    stack: ["Python", "Machine Learning", "Optuna", "SHAP", "Pandas", "Scikit-learn"],
    githubUrl: "https://github.com/Anirudh-bit-cloud",
    liveUrl: "https://github.com/Anirudh-bit-cloud",
    architecture: {
      backend: "Python data processing engine with modular validation pipelines",
      model: "Ensemble classifiers tuned via Optuna Bayesian search",
      frontend: "Report generation interface outputting SHAP summary values",
      database: "In-memory Pandas and NumPy matrix operations",
    },
  },
  {
    number: "03",
    id: "online-examination-system",
    title: "Online Examination System",
    year: "2025",
    tagline: "Secure testing portal with strict role-based access control and live timers.",
    problem:
      "Academic testing platforms require strict role isolation between admins, instructors, and examinees, along with tamper-resistant exam timers.",
    built:
      "A complete full-stack portal built with Spring Boot, MySQL, and React. Engineered role-based authorization (RBAC), automated submission clocks, and real-time score calculation.",
    outcome:
      "Handled concurrent submission workflows with ACID transactions, zero grading latency, and immediate percentile breakdown charts.",
    metricBadge: "Full-Stack RBAC",
    category: "Full-Stack Web",
    stack: ["React.js", "Spring Boot", "MySQL", "REST APIs", "Java"],
    githubUrl: "https://github.com/Anirudh-bit-cloud",
    liveUrl: "https://github.com/Anirudh-bit-cloud",
    architecture: {
      frontend: "React dashboard with client-side anti-tab switch warnings and live timer",
      backend: "Spring Boot RESTful service with token-based security and JPA repositories",
      database: "Normalized MySQL relational schema with indexed submission tables",
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    number: "01",
    role: "Artificial Intelligence & Machine Learning Trainee",
    organization: "C-DAC MEPZ",
    period: "Jul 2026 — Present",
    location: "Chennai, Tamil Nadu",
    current: true,
    summary:
      "Selected for an intensive 400-hour government-backed industry specialization focusing on end-to-end predictive pipelines.",
    responsibilities: [
      "Engineered machine learning workflows using Scikit-learn, Pandas, and NumPy across structured enterprise datasets.",
      "Conducted exploratory data analysis, feature selection, missing value imputation, and model evaluation metrics (ROC-AUC, F1-score).",
      "Integrated SHAP explainability to audit feature importance and safeguard against model bias.",
    ],
    tools: ["Python", "Scikit-learn", "Pandas", "NumPy", "Optuna", "SHAP", "Model Validation"],
  },
  {
    number: "02",
    role: "Data Science & Machine Learning Intern",
    organization: "Unified Mentor",
    period: "2025 — 2026",
    location: "Remote",
    current: false,
    summary:
      "Conducted data-driven analysis and engineered machine learning predictive models across structured business datasets.",
    responsibilities: [
      "Performed comprehensive Exploratory Data Analysis (EDA) and data wrangling on real-world datasets using Pandas and NumPy.",
      "Trained and benchmarked supervised machine learning models (Classification & Regression) with Scikit-learn.",
      "Generated analytical dashboards and feature importance visualizations to interpret statistical trends and improve prediction accuracy.",
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "EDA", "Matplotlib", "Data Visualization"],
  },
  {
    number: "03",
    role: "PPCH, Quality Assurance",
    organization: "Aaruush (SRMIST)",
    period: "May 2026 — Present",
    location: "Chennai, India",
    current: true,
    summary:
      "Overseeing operational standards and student workflow coordination for national-level collegiate initiatives.",
    responsibilities: [
      "Coordinated cross-functional student teams across university administration and event committees.",
      "Enforced quality assurance criteria across technical workshops, exhibits, and participant infrastructure.",
      "Managed incident reporting and operational logistics during high-attendance sessions.",
    ],
    tools: ["Operations", "Quality Assurance", "Team Leadership", "Cross-functional Coordination"],
  },
  {
    number: "04",
    role: "Committee Member",
    organization: "Aaruush 2025",
    period: "2025",
    location: "Chennai, India",
    current: false,
    summary:
      "Supported on-ground execution, event management, and technical festival logistics.",
    responsibilities: [
      "Facilitated hackathon setups, venue logistics, and speaker session execution.",
      "Coordinated with student participants and resolved registration bottlenecks on site.",
    ],
    tools: ["Event Operations", "Logistics", "Problem Solving"],
  },
];

export const SKILL_GROUPS = [
  {
    index: "01",
    name: "Machine Learning & AI",
    items: [
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Feature Engineering",
      "Predictive Modeling",
      "Model Evaluation",
      "SHAP (Explainable AI)",
      "Optuna (HPO)",
    ],
  },
  {
    index: "02",
    name: "Languages",
    items: ["Python", "Java", "C++", "SQL"],
  },
  {
    index: "03",
    name: "Web & Frameworks",
    items: ["React.js", "FastAPI", "Spring Boot", "HTML5", "CSS3", "REST APIs"],
  },
  {
    index: "04",
    name: "Databases & Storage",
    items: ["MySQL", "Relational Modeling", "Query Optimization"],
  },
  {
    index: "05",
    name: "Tools & Environments",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab"],
  },
  {
    index: "06",
    name: "Core Computer Science",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech. in Computer Science and Engineering",
    school: "SRM Institute of Science and Technology",
    period: "2024 — 2028",
    grade: "CGPA: 8.70 / 10.00",
    note: "Focus on Machine Learning, Algorithms, and System Architecture.",
  },
  {
    degree: "Senior Secondary (Class XII) & Secondary (Class X)",
    school: "City Montessori School, Lucknow",
    period: "Completed",
    grade: "Class XII: 91% · Class X: 96%",
    note: "Strong academic foundation in Mathematics, Sciences, and Computing.",
  },
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  tag: string;
  issueDate: string;
  credentialId: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Programming in Java",
    issuer: "NPTEL (Ministry of Education, Govt. of India)",
    tag: "Core Engineering",
    issueDate: "2025",
    credentialId: "NPTEL25CS09881",
    verificationUrl: "https://nptel.ac.in",
    description: "Proctored national examination covering Object-Oriented Programming, Multithreading, Exception Handling, Collections Framework, and JVM architecture.",
    skills: ["Java", "OOP", "Collections", "Multithreading", "JVM Internals"],
  },
  {
    id: "cert-2",
    title: "Advanced Java",
    issuer: "SRM Institute of Science and Technology (SRMIST)",
    tag: "Enterprise",
    issueDate: "2025",
    credentialId: "SRMIST-CSE-ADVJAVA-2025",
    verificationUrl: "https://www.srmist.edu.in",
    description: "In-depth enterprise Java concepts, JDBC database connectivity, design patterns, servlet life cycles, and application architecture.",
    skills: ["Advanced Java", "JDBC", "Design Patterns", "Enterprise Architecture"],
  },
  {
    id: "cert-3",
    title: "Data Structures & Algorithms in C",
    issuer: "SRM Institute of Science and Technology (SRMIST)",
    tag: "DSA Foundation",
    issueDate: "2024",
    credentialId: "SRMIST-DSA-C-2024",
    verificationUrl: "https://www.srmist.edu.in",
    description: "Rigorous algorithmic coursework covering pointer arithmetic, memory allocation, linear and non-linear data structures, trees, graphs, and Big-O complexity.",
    skills: ["C Programming", "Data Structures", "Algorithms", "Pointers", "Memory Management"],
  },
  {
    id: "cert-4",
    title: "30+ Algorithmic Challenges Solved",
    issuer: "LeetCode (Handle: Anirudh Saini567)",
    tag: "Competitive Coding",
    issueDate: "Active",
    credentialId: "LEETCODE-ANIRUDH567",
    verificationUrl: "https://leetcode.com/u/Anirudh-Saini567/",
    description: "Demonstrated problem-solving proficiency across Arrays, Binary Search, Linked Lists, Recursion, Two Pointers, and Dynamic Programming.",
    skills: ["Binary Search", "Two Pointers", "Linked Lists", "Recursion", "Dynamic Programming"],
  },
];
