'use client';

import React, { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import { externalContentAPI } from '@/lib/api';
import { ExternalContent } from '@/types';

export default function ProjectsPage() {
  const [repos, setRepos] = useState<ExternalContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await externalContentAPI.getGithubRepos({ limit: 20 });
        setRepos(response.data.data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-12 neon-text-green flex items-center">
          <BackButton />
          github_projects
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <a
              key={repo._id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-border terminal-border-hover p-6 cursor-pointer hover:bg-opacity-10 hover:bg-neon-cyan transition-all"
            >
              <h3 className="text-lg font-bold mb-2 neon-text-cyan">{repo.title}</h3>
              <p className="text-sm opacity-75 mb-4">{repo.description || 'No description'}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.metadata?.language && (
                  <span className="text-xs px-2 py-1 border border-neon-green">
                    {repo.metadata.language}
                  </span>
                )}
                {repo.metadata?.topics?.map((topic: string) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 border border-neon-purple opacity-50"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs opacity-50">
                <span>⭐ {repo.metadata?.stars || 0} stars</span>
                <span>Updated: {new Date(repo.publishedAt).toLocaleDateString()}</span>
              </div>
            </a>
          ))}
        </div>

        {repos.length === 0 && !isLoading && (
          <div className="terminal-border p-8 text-center">
            <p>No projects found. Connect your GitHub account to sync.</p>
          </div>
        )}
      </div>
    </div>
  );
}
