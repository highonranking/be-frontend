'use client';

import React from 'react';
import Link from 'next/link';

export default function TerminalHeader() {
  return (
    <header className="bg-terminal-bg border-b-2 border-neon-green p-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-neon-green text-xl font-bold">
            <span className="neon-text">{'>>>'}</span> Abhinav Dixit
          </div>
          <span className="text-neon-blue text-sm opacity-50">v1.0.0</span>
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
