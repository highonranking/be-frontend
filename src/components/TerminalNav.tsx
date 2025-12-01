'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function TerminalNav() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { label: 'Home', href: '/', icon: '$home' },
    { label: 'Projects', href: '/projects', icon: '$projects' },
    { label: 'Blog', href: '/blog', icon: '$blog' },
    { label: 'About', href: '/about', icon: '$about' },
    ...(isLoggedIn && user?.role === 'admin' 
      ? [{ label: 'Admin', href: '/admin', icon: '$admin' }]
      : []
    ),
  ];

  return (
    <nav className="max-w-7xl mx-auto px-4 mb-8">
      <div className="flex flex-col md:flex-row gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="terminal-border terminal-border-hover px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-neon-green transition-all"
          >
            <span className="text-neon-blue">{item.icon}:</span>
            <span className="ml-2">{item.label}</span>
          </Link>
        ))}
        
        <div className="flex-1"></div>
        
        {isLoggedIn ? (
          <div className="terminal-border px-4 py-2 text-sm">
            <span className="text-neon-green">User:</span>
            <span className="ml-2">{user?.name || 'Admin'}</span>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="terminal-border terminal-border-hover px-4 py-2 text-sm"
          >
            <span className="text-neon-purple">$ login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
