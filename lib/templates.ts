// 6 Ready-to-Use Project Templates

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  stack: string[]
  prompt: string
  files: {
    path: string
    content: string
  }[]
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS Starter',
    description: 'Full-featured SaaS application with authentication, billing, and dashboard',
    category: 'Full Stack',
    icon: '🚀',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    prompt: 'Create a SaaS application with user authentication, subscription billing, and admin dashboard',
    files: [],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Modern e-commerce platform with product catalog, cart, and checkout',
    category: 'E-commerce',
    icon: '🛒',
    stack: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    prompt: 'Build an e-commerce store with product listings, shopping cart, and payment integration',
    files: [],
  },
  {
    id: 'blog-cms',
    name: 'Blog & CMS',
    description: 'Content management system with markdown support and SEO optimization',
    category: 'Content',
    icon: '📝',
    stack: ['Next.js', 'MDX', 'TypeScript', 'Tailwind CSS'],
    prompt: 'Create a blog platform with content management and markdown support',
    files: [],
  },
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with charts and data visualization',
    category: 'Analytics',
    icon: '📊',
    stack: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    prompt: 'Build an analytics dashboard with real-time data visualization and charts',
    files: [],
  },
  {
    id: 'api-backend',
    name: 'REST API Backend',
    description: 'Scalable REST API with authentication and database integration',
    category: 'Backend',
    icon: '⚡',
    stack: ['Next.js API Routes', 'TypeScript', 'Prisma', 'PostgreSQL'],
    prompt: 'Create a REST API with authentication, database integration, and documentation',
    files: [],
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Personal portfolio with project showcase and contact form',
    category: 'Website',
    icon: '🎨',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    prompt: 'Build a portfolio website with project showcase and animations',
    files: [],
  },
]

export function getTemplate(id: string): ProjectTemplate | undefined {
  return projectTemplates.find((template) => template.id === id)
}

export function getTemplatesByCategory(category: string): ProjectTemplate[] {
  return projectTemplates.filter((template) => template.category === category)
}

export function getAllTemplates(): ProjectTemplate[] {
  return projectTemplates
}
