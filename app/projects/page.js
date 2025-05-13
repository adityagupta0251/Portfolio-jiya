'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaRocket, FaDatabase, FaStar, FaCodeBranch, FaTag, FaLink } from 'react-icons/fa';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          'https://api.github.com/users/jayantidev76/repos?sort=created&direction=desc'
        );
        if (!res.ok) throw new Error((await res.json()).message);
        setRepos(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const projects = repos.filter(r => !r.topics?.includes('projects'));
  const pastProjects = repos.filter(r => r.topics?.includes('past'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-sky-50 text-sky-900"
    >
      <div className="container mt-20 mx-auto pb-32 pt-14 px-5 md:px-10">
        <Header />

        {loading && <Status message="Loading repositories..." color="sky" />}
        {error && <Status message={`Error: ${error}`} color="rose" />}

        {!loading && !error && (
          <>
            <Section title="Past & Ongoing Projects" icon={<FaRocket className="text-pink-400" />} items={projects} />
            
          </>
        )}
      </div>
    </motion.div>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col items-center text-center mb-20 gap-4"
    >
      <h1 className="font-bold text-4xl md:text-6xl bg-gradient-to-r from-pink-300 to-sky-400 bg-clip-text text-transparent">
        Development Portfolio
      </h1>
      <p className="text-lg max-w-3xl leading-relaxed text-sky-700">
        Exploring open-source contributions and cutting-edge project development.
      </p>
    </motion.div>
  );
}

function Status({ message, color }) {
  return (
    <div className={`text-center text-xl text-${color}-500 mt-10`}>{message}</div>
  );
}

function Section({ title, icon, items }) {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold text-center mb-8 flex justify-center items-center gap-3 text-sky-800">
        {icon} {title}
      </h2>
      <div className={`grid gap-6 ${items.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {items.map(repo => <RepoCard key={repo.id} repo={repo} />)}
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/20 border border-sky-100 rounded-xl flex flex-col h-full shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl font-semibold text-sky-700 hover:text-pink-500 transition"
          >
            {repo.name}
          </a>
          <p className="text-sky-600 text-sm mt-1">{repo.description}</p>
        </div>
        <Stats repo={repo} />
      </div>

      <Tags topics={repo.topics} />

      <div className="mt-auto flex justify-between items-center text-sm text-sky-600">
        <div className="flex items-center gap-1">
          <FaLink className="text-pink-400" />
          <a href={repo.html_url} className="hover:underline hover:text-pink-500">View Code</a>
        </div>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}

function Stats({ repo }) {
  return (
    <div className="flex gap-4 items-center text-sm text-sky-600">
      <div className="flex items-center gap-1">
        <FaStar className="text-pink-400" /> {repo.stargazers_count}
      </div>
      <div className="flex items-center gap-1">
        <FaCodeBranch className="text-pink-400" /> {repo.forks_count}
      </div>
    </div>
  );
}

function Tags({ topics = [] }) {
  if (!topics.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {topics.map(topic => (
        <span 
          key={topic} 
          className="flex items-center gap-1 text-xs bg-pink-200/50 text-sky-700 px-2 py-1 rounded-full"
        >
          <FaTag className="text-pink-400" /> {topic}
        </span>
      ))}
    </div>
  );
}