import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function AchievementsList() {
  const data = usePortfolioStore((s) => s.data);
  if (!data) return null;
  return (
    <div className="terminal-border p-4 mb-8">
      <h2 className="text-xl neon-text-yellow mb-4">$ achievements</h2>
      <ul className="list-disc ml-5 space-y-2 text-sm">
        {data.achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
