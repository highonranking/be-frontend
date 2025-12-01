import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function ExperienceTimeline() {
  const data = usePortfolioStore((s) => s.data);
  if (!data) return null;
  return (
    <div className="terminal-border p-4 mb-8">
      <h2 className="text-xl neon-text-cyan mb-4">$ experience.timeline</h2>
      <ul className="space-y-4">
        {data.experience.map((exp, idx) => (
          <li key={idx} className="border-l-2 border-terminal-green pl-4">
            <div className="font-semibold">{exp.position} @ {exp.company}</div>
            <div className="text-xs opacity-70">{exp.location} • {exp.duration}</div>
            {exp.responsibilities && (
              <ul className="mt-2 list-disc ml-5 text-sm opacity-80 space-y-1">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
