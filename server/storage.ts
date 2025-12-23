import type { Project, InsertProject, Skill, InsertSkill } from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Web3 Wallet Dashboard",
    description: "Next-generation interface for decentralized asset management and blockchain connectivity. Features secure non-custodial integration, real-time blockchain synchronization, and multi-chain support across Mainnet, Testnets, and L2s.",
    imageUrl: "/generated-images/web3_wallet_dashboard_interface.png",
    tags: ["React", "Web3.js", "Blockchain", "Solidity"],
    projectUrl: "https://web3-wallet-dashboard.onrender.com",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "Crypto Price Tracker",
    description: "Real-time cryptocurrency price tracking and market analysis platform. Monitor multiple digital assets across exchanges with live price feeds, historical charts, and market insights powered by blockchain data.",
    imageUrl: "/generated-images/crypto_price_tracker_dashboard.png",
    tags: ["React", "API Integration", "Data Visualization", "Vercel"],
    projectUrl: "https://maxcryptopricetracker.vercel.app/",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Finest Steel - B2B Commerce",
    description: "Full-stack e-commerce platform for Nigeria's leading iron and stainless steel supplier. Features product catalog, quote system, real-time inventory, and seamless order management for construction materials.",
    imageUrl: "/generated-images/b2b_e-commerce_platform_interface.png",
    tags: ["Full-Stack", "E-commerce", "Node.js", "React"],
    projectUrl: "https://www.fineststeelng.com",
    repoUrl: "#"
  }
];

const SKILLS: Skill[] = [
  {
    id: 1,
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js", "Vue.js", "HTML5", "CSS3", "JavaScript ES6+", "Redux", "React Query"]
  },
  {
    id: 2,
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Python", "FastAPI", "RESTful APIs", "GraphQL", "Microservices", "Authentication"]
  },
  {
    id: 3,
    category: "Web3 & Blockchain",
    items: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "Blockchain Architecture", "MetaMask", "NFTs", "Token Development"]
  },
  {
    id: 4,
    category: "Tools & Deployment",
    items: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Render", "CI/CD", "Linux", "Nginx", "Database Design"]
  },
  {
    id: 5,
    category: "Design & UX",
    items: ["Responsive Design", "UI/UX Principles", "Figma", "Accessibility", "Performance Optimization", "SEO"]
  },
  {
    id: 6,
    category: "Testing & Quality",
    items: ["Jest", "Unit Testing", "Integration Testing", "Debugging", "Code Review", "Agile Development"]
  }
];

export class InMemoryStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return PROJECTS;
  }

  async getSkills(): Promise<Skill[]> {
    return SKILLS;
  }
}

export const storage = new InMemoryStorage();
