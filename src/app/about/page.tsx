'use client';

import React from 'react';
import BackButton from '@/components/BackButton';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function AboutPage() {
  const { data: portfolio } = usePortfolioStore();

  return (
    <>
      <div className="min-h-screen bg-terminal-bg text-terminal-text">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl mb-8 neon-text-green flex items-center">
            <BackButton /> about Abhinav Dixit - Software Developer
          </h1>
          {portfolio ? (
            <div className="terminal-border p-8">
              <h2 className="text-xl font-semibold mb-2 neon-text-green">Bio</h2>
              <p className="mb-6">
                <strong>Abhinav Dixit</strong> is a <strong>Software Development Engineer</strong> and <strong>Frontend Developer</strong> specialist with a passion for React, Next.js, and system design. Experienced in building scalable, performant web applications and leading frontend architecture at Yatra, StampMy Visa, and CRED. Expert in TypeScript, JavaScript, and modern web technologies.
              </p>

              <h2 className="text-xl font-semibold mb-2 neon-text-green">Work Experience - Software Engineer Journey</h2>
              <ul className="mb-6">
                {portfolio.experience?.map((exp, i) => (
                  <li key={i} className="mb-4">
                    <div className="font-semibold">{exp.position} @ {exp.company}</div>
                    <div className="text-xs opacity-70 mb-1">{exp.duration}</div>
                    <ul className="list-disc ml-6 text-sm">
                      {exp.responsibilities?.map((resp, j) => (
                        <li key={j}>{resp}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mb-2 neon-text-green">Education</h2>
              <div className="mb-4">
                <div className="font-semibold">{portfolio.education?.institution}</div>
                <div className="text-sm opacity-70">{portfolio.education?.degree} ({portfolio.education?.graduationDate})</div>
                <div className="text-sm">GPA/CGPA: {portfolio.education?.gpaCgpa}</div>
              </div>

              <h2 className="text-xl font-semibold mb-2 neon-text-green">Contact Abhinav Dixit</h2>
              <ul className="mb-4">
                <li>Email: <a href="mailto:abhinavdixit2306@gmail.com" className="underline text-neon-cyan">abhinavdixit2306@gmail.com</a></li>
                <li>LinkedIn: <a href={`https://${portfolio.socialLinks.linkedin}`} className="underline text-neon-cyan" rel="noopener noreferrer" target="_blank">{portfolio.socialLinks.linkedin}</a></li>
                <li>GitHub: <a href={`https://${portfolio.socialLinks.github}`} className="underline text-neon-cyan" rel="noopener noreferrer" target="_blank">{portfolio.socialLinks.github}</a></li>
              </ul>
              {/* LinkedIn Follow Button - prominent, modern, and fits the theme */}
              <div className="flex justify-center mb-8">
                <a
                  href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=highonranking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors duration-200 shadow-lg border-2 border-[#0A66C2] hover:border-[#1FB6FF] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]"
                  style={{ minWidth: 200 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="4" fill="#fff"/>
                    <path d="M17.146 17.146h-2.356v-3.356c0-.8-.014-1.83-1.116-1.83-1.116 0-1.287.872-1.287 1.772v3.414H9.03V9.75h2.263v1.014h.032c.315-.6 1.086-1.23 2.237-1.23 2.393 0 2.834 1.575 2.834 3.626v4.986zM7.07 8.736a1.37 1.37 0 1 1 0-2.74 1.37 1.37 0 0 1 0 2.74zm1.18 8.41H5.89V9.75h2.36v7.396z" fill="#0A66C2"/>
                  </svg>
                  <span className="font-semibold text-white text-base tracking-wide group-hover:text-[#1FB6FF] transition-colors">Follow on LinkedIn</span>
                </a>
              </div>
              <h2 className="text-xl font-semibold mb-2 neon-text-green">Achievements & Competitive Programming</h2>
              <ul className="list-disc ml-6">
                {portfolio.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="terminal-border p-8 text-center">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}
