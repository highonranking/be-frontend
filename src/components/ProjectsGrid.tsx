import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function ProjectsGrid() {
  const data = usePortfolioStore((s) => s.data);
  if (!data) return null;
  return (
    <div className="terminal-border p-4 mb-8">
      <h2 className="text-xl neon-text-green mb-4">$ projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {data.projects.map((p, idx) => (
          <div key={idx} className="terminal-border-hover border border-terminal-cyan p-3 rounded">
            <h3 className="font-semibold mb-1">{p.name}</h3>
            <p className="text-xs opacity-70 mb-2">{p.technologies.join(', ')}</p>
            <p className="text-sm opacity-85">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
