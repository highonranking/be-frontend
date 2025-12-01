'use client';

import React, { useEffect, useState } from 'react';

export default function TerminalHeader() {
async function fetchVersion(): Promise<string> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/version`);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    return data?.tag || 'v1.0.0';
  } catch {
    return 'v1.0.0';
  }
}

  const [version, setVersion] = useState('v1.0.0');

  useEffect(() => {
    fetchVersion().then(setVersion);
  }, []);
  return (
    <header className="bg-terminal-bg border-b-2 border-neon-green p-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-neon-green text-xl font-bold">
            <span className="neon-text">{'>>>'}</span> Abhinav Dixit
          </div>
          <span className="text-neon-blue text-sm opacity-50">{version}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-sm">
          <span className="text-neon-blue opacity-50">$</span>
          <span className="opacity-75">Status: Online</span>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}
