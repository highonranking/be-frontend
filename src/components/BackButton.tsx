"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => router.back()}
      className="glowing-text mr-2 hover:text-neon-cyan focus:outline-none"
    >
      {'>'}
    </button>
  );
}