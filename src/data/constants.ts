export interface Skill {
  name: string;
  category: "ai" | "data" | "web" | "tools";
  icon: string;
  level?: string;
  color?: string;
  file?: string;
}

export const SPECIFIED_SKILL_ROWS: Skill[][] = [
  // 1st row: "HTML", "CSS"
  [
    { name: "HTML5", category: "web", icon: "SiHtml5", level: "Semantic Web", color: "#f97316", file: "html5.svg" },
    { name: "CSS3", category: "web", icon: "SiCss", level: "Modern Styling", color: "#3b82f6", file: "css3.svg" },
  ],
  // 2nd row: "Figma", "Excel", "PowerBI", "Tableau"
  [
    { name: "Figma", category: "tools", icon: "SiFigma", level: "UI/UX Design", color: "#ec4899", file: "figma.svg" },
    { name: "Excel", category: "data", icon: "SiMicrosoftexcel", level: "Data Analysis", color: "#16a34a", file: "excel.svg" },
    { name: "Power BI", category: "data", icon: "SiPowerbi", level: "Business Analytics", color: "#eab308", file: "powerbi.svg" },
    { name: "Tableau", category: "data", icon: "SiTableau", level: "BI & Dashboards", color: "#ea580c", file: "tableau.svg" },
  ],
  // 3rd row: "Python", "Numpy", "Pandas", "Scikit learn", "Plotly", "PyTorch"
  [
    { name: "Python", category: "ai", icon: "SiPython", level: "Core Language", color: "#38bdf8", file: "python.svg" },
    { name: "NumPy", category: "ai", icon: "SiNumpy", level: "Numerical Computations", color: "#06b6d4", file: "numpy.svg" },
    { name: "Pandas", category: "ai", icon: "SiPandas", level: "Data Processing", color: "#8b5cf6", file: "pandas.svg" },
    { name: "Scikit-Learn", category: "ai", icon: "SiScikitlearn", level: "ML Algorithms", color: "#f59e0b", file: "scikitlearn.svg" },
    { name: "Plotly", category: "tools", icon: "SiPlotly", level: "Interactive Data Viz", color: "#a855f7", file: "plotly.svg" },
    { name: "PyTorch", category: "ai", icon: "SiPytorch", level: "Neural Networks", color: "#ef4444", file: "pytorch.svg" },
  ],
  // 4th row: "MySQL", "Git", "GitHub", "Vercel"
  [
    { name: "MySQL", category: "data", icon: "SiMysql", level: "Relational DB", color: "#0284c7", file: "mysql.svg" },
    { name: "Git", category: "tools", icon: "SiGit", level: "Version Control", color: "#f97316", file: "git.svg" },
    { name: "GitHub", category: "tools", icon: "SiGithub", level: "Code Hosting", color: "#e2e8f0", file: "github.svg" },
    { name: "Vercel", category: "tools", icon: "SiVercel", level: "Cloud Deployment", color: "#ffffff", file: "vercel.svg" },
  ],
  // 5th row: "Tensorflow", "Streamlit"
  [
    { name: "TensorFlow", category: "ai", icon: "SiTensorflow", level: "Deep Learning", color: "#f97316", file: "tensorflow.svg" },
    { name: "Streamlit", category: "tools", icon: "SiStreamlit", level: "Data Web Apps", color: "#ef4444", file: "streamlit.svg" },
  ],
];

export const SKILLS: Skill[] = SPECIFIED_SKILL_ROWS.flat();

export const SKILL_ROWS: Skill[][] = SPECIFIED_SKILL_ROWS;

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
