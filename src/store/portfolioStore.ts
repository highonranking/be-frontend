import { create } from 'zustand';
import { portfolioAPI } from '@/lib/api';

interface ExperienceItem {
  company: string;
  position: string;
  location?: string;
  duration: string;
  responsibilities?: string[];
}

interface EducationData {
  degree: string;
  institution: string;
  university?: string;
  graduationDate?: string;
  gpaCgpa?: string;
}

interface ProjectItem {
  name: string;
  technologies: string[];
  description: string;
  link?: string;
}

interface VolunteerItem {
  role: string;
  organization: string;
  description?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface SocialLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  codeforces?: string;
  leetcode?: string;
  geeksforgeeks?: string;
  codechef?: string;
  medium?: string;
  twitter?: string;
}

interface PortfolioData {
  stats: { totalProjects: number; totalBlogs: number; yearsOfExperience: number };
  experience: ExperienceItem[];
  education?: EducationData;
  projects: ProjectItem[];
  achievements: string[];
  volunteerExperience: VolunteerItem[];
  skills: SkillCategory[];
  socialLinks: SocialLinks;
}

interface PortfolioStore {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
  fetchPortfolio: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchPortfolio: async () => {
    set({ loading: true, error: null });
    try {
      const res = await portfolioAPI.getPortfolio();
      set({ data: res.data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to load portfolio', loading: false });
    }
  },
}));
