import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function SkillsMatrix() {
  const data = usePortfolioStore((s) => s.data);
  if (!data) return null;
  return (
    <div className="terminal-border p-4 mb-8">
      <h2 className="text-xl neon-text-magenta mb-4">$ skills.matrix</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {data.skills.map((group, idx) => (
          <div key={idx} className="border border-terminal-green p-3 rounded">
            <h3 className="font-semibold mb-2">{group.category}</h3>
            <ul className="flex flex-wrap gap-2 text-xs">
              {group.items.map((item, i) => (
                <li key={i} className="px-2 py-1 bg-terminal-green/10 border border-terminal-green rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
