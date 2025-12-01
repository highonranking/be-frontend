'use client';

import { useEffect } from 'react';
import TerminalHeader from '@/components/TerminalHeader';
import TerminalNav from '@/components/TerminalNav';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function Home() {
  const { data: portfolio, fetchPortfolio, loading } = usePortfolioStore();

  useEffect(() => {
    if (!portfolio && !loading) fetchPortfolio();
  }, [portfolio, loading, fetchPortfolio]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <TerminalHeader />
      <TerminalNav />
      
      {/* Main Terminal-like Interface */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="terminal-border p-8 mb-6">
            <div className="text-terminal-text mb-4">
              <span className="glowing-text">{'> '}</span>
              <span className="neon-text-green">abhinav@portfolio:~$</span>
              <span className="ml-2">whoami</span>
            </div>
            <div className="text-terminal-text opacity-75 mb-4 ml-4">
              <span className="neon-text-cyan">Abhinav Dixit</span>
              <span className="ml-2">| Software Development Engineer</span>
            </div>
            <div className="text-terminal-text opacity-75 mb-4">
              <span className="glowing-text">{'> '}</span>
              <span className="neon-text-green">abhinav@portfolio:~$</span>
              <span className="ml-2">cat experience.txt</span>
            </div>
            <div className="text-terminal-text opacity-60 mb-4 ml-4">
              <span>3+ years building scalable web applications at Yatra, StampMy Visa & CRED</span>
            </div>
            <div className="text-terminal-text opacity-75 mb-2">
              <span className="glowing-text">{'> '}</span>
              <span className="neon-text-green">abhinav@portfolio:~$</span>
              <span className="ml-2">./tech-stack.sh</span>
            </div>
            <div className="text-terminal-text opacity-50 ml-4">
              <span className="neon-text-magenta">⚡</span> Frontend Specialist: React • Next.js • TypeScript • JavaScript • AngularJS<br />
              <span className="neon-text-cyan">🎨</span> Frontend System Design • UI/UX Optimization • Performance Engineering<br />
              <span className="neon-text-yellow">☁️</span> Backend & Cloud: Spring Boot • Node.js • AWS • Docker • MongoDB<br />
              <span className="neon-text-green">🏆</span> Competitive Programming: 5⭐ CodeChef (1926*) • 600+ LeetCode
            </div>
          </div>
        </section>

        {/* Portfolio Summary */}
        {portfolio && (
          <section className="terminal-border p-6 mb-12">
            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="neon-text-green text-sm mb-1">$ stats</h3>
                <p className="text-xs opacity-80">Years: {portfolio.stats.yearsOfExperience}</p>
                <p className="text-xs opacity-80">Projects: {portfolio.stats.totalProjects}</p>
                <p className="text-xs opacity-80">Blogs: {portfolio.stats.totalBlogs}</p>
              </div>
              {portfolio.education && (
                <div>
                  <h3 className="neon-text-cyan text-sm mb-1">$ education</h3>
                  <p className="text-xs opacity-80">{portfolio.education.degree}</p>
                  <p className="text-xs opacity-60">{portfolio.education.institution}</p>
                </div>
              )}
              <div>
                <h3 className="neon-text-purple text-sm mb-1">$ socials</h3>
                <p className="text-xs opacity-70">Github: {portfolio.socialLinks.github}</p>
                <p className="text-xs opacity-70">LinkedIn: {portfolio.socialLinks.linkedin}</p>
              </div>
              <div>
                <h3 className="neon-text-yellow text-sm mb-1">$ achievements.count</h3>
                <p className="text-xs opacity-80">{portfolio.achievements.length} achievements</p>
              </div>
            </div>
            {/* Experience Teaser */}
            <div className="mt-6">
              <h3 className="neon-text-green text-sm mb-2">$ experience.top</h3>
              <ul className="text-xs space-y-2">
                {portfolio.experience.slice(0,2).map((exp,i) => (
                  <li key={i} className="border-l-2 border-terminal-green pl-2">
                    <span className="font-semibold">{exp.position}</span> @ {exp.company} <span className="opacity-60">({exp.duration})</span>
                    {exp.responsibilities && <div className="opacity-60">Tasks: {exp.responsibilities.length}</div>}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skills Teaser */}
            <div className="mt-6">
              <h3 className="neon-text-magenta text-sm mb-2">$ skills.preview</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.slice(0,2).map((group, gi) => (
                  <div key={gi} className="border border-terminal-magenta px-2 py-1 rounded text-[10px]">
                    <span className="font-semibold">{group.category}:</span> {group.items.slice(0,5).join(', ')}
                  </div>
                ))}
              </div>
            </div>
            {/* Portfolio Link CTA */}
            <div className="mt-6">
              <a href="/portfolio" className="inline-block terminal-border-hover border border-terminal-cyan px-4 py-2 text-xs rounded hover:bg-terminal-cyan/10 transition-colors">
                {'>'} open portfolio.full_view
              </a>
            </div>
          </section>
        )}

        {/* Featured Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="terminal-border terminal-border-hover p-6 cursor-pointer">
            <h3 className="neon-text-cyan mb-4">$ frontend.expertise</h3>
            <p className="text-sm opacity-75">React • Next.js • System Design • Performance Optimization</p>
          </div>
          
          <div className="terminal-border terminal-border-hover p-6 cursor-pointer">
            <h3 className="neon-text-purple mb-4">$ projects.showcase</h3>
            <p className="text-sm opacity-75">Full-stack applications with modern frontend architecture</p>
          </div>

          <div className="terminal-border terminal-border-hover p-6 cursor-pointer">
            <h3 className="neon-text-green mb-4">$ articles.latest</h3>
            <p className="text-sm opacity-75">Frontend best practices and system design insights</p>
          </div>
        </div>

        {loading && !portfolio && (
          <div className="text-center text-xs opacity-60 mt-8">Fetching portfolio data...</div>
        )}
      </main>
    </div>
  );
}
