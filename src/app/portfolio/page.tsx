'use client';
import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import TerminalHeader from '@/components/TerminalHeader';
import TerminalNav from '@/components/TerminalNav';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import SkillsMatrix from '@/components/SkillsMatrix';
import AchievementsList from '@/components/AchievementsList';

export default function PortfolioPage() {
  const { fetchPortfolio, data, loading, error } = usePortfolioStore();

  useEffect(() => {
    if (!data) fetchPortfolio();
  }, [data, fetchPortfolio]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <TerminalHeader />
      <TerminalNav />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="terminal-border p-6 mb-8">
          <div className="text-terminal-text mb-4"><span className="glowing-text">&gt; </span><span className="neon-text-green">portfolio.load()</span></div>
          {loading && <p className="opacity-70">Loading portfolio data...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {data && (
            <div className="text-sm opacity-80">
              <p>Years of Experience: {data.stats.yearsOfExperience}</p>
              <p>Projects: {data.stats.totalProjects} | Blogs: {data.stats.totalBlogs}</p>
              {data.education && (
                <p className="mt-2">Education: {data.education.degree} - {data.education.institution} ({data.education.graduationDate})</p>
              )}
            </div>
          )}
        </div>
        <ExperienceTimeline />
        <ProjectsGrid />
        <SkillsMatrix />
        <AchievementsList />
      </main>
    </div>
  );
}
