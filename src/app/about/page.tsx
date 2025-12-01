'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function AboutPage() {
  const { data: portfolio } = usePortfolioStore();

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8 neon-text-green">
          <span className="glowing-text">{'>'}</span> about
        </h1>
        {portfolio ? (
          <div className="terminal-border p-8">
            <h3 className="text-xl font-semibold mb-2 neon-text-green">Bio</h3>
            <p className="mb-6">Frontend specialist with a passion for React, Next.js, and system design. Experienced in building scalable, performant web applications and leading frontend architecture at Yatra, StampMy Visa, and CRED.</p>

            <h3 className="text-xl font-semibold mb-2 neon-text-green">Work Experience</h3>
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

            <h3 className="text-xl font-semibold mb-2 neon-text-green">Education</h3>
            <h2 className="text-2xl font-bold mb-4 neon-text-cyan">{portfolio.education?.institution}</h2>
            <p className="mb-4 text-lg">{portfolio.education?.degree} ({portfolio.education?.graduationDate})</p>
            <p className="mb-6">GPA/CGPA: {portfolio.education?.gpaCgpa}</p>

            <h3 className="text-xl font-semibold mb-2 neon-text-green">Contact</h3>
            <ul className="mb-4">
              <li>Email: <a href="mailto:abhinavdixit2306@gmail.com" className="underline text-neon-cyan">abhinavdixit2306@gmail.com</a></li>
              <li>LinkedIn: <a href={`https://${portfolio.socialLinks.linkedin}`} className="underline text-neon-cyan">{portfolio.socialLinks.linkedin}</a></li>
              <li>GitHub: <a href={`https://${portfolio.socialLinks.github}`} className="underline text-neon-cyan">{portfolio.socialLinks.github}</a></li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 neon-text-green">Achievements</h3>
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
  );
}
