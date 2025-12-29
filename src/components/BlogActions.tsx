"use client";
import { useState } from "react";

interface BlogActionsProps {
  blogId: string;
  initialLikes: number;
}

export default function BlogActions({ blogId, initialLikes }: BlogActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
  if (!process.env.NEXT_PUBLIC_API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set');
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}/like`, { method: "POST" });
      setLikes((l) => l + 1);
    } catch (e) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={handleLike}
        disabled={loading}
        className="px-6 py-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-terminal-bg transition-colors"
      >
        ❤️ Like ({likes})
      </button>
      <button
        onClick={handleShare}
        className="px-6 py-2 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-terminal-bg transition-colors"
      >
        🔗 Share
      </button>
    </div>
  );
}
