
'use client';

import { useState, useEffect } from 'react';
import type { Project, SkillCategory } from '@/lib/definitions';

interface PortfolioData {
  projects: Omit<Project, 'image'>[];
  skillCategories: SkillCategory[];
}

export default function EditPortfolio() {
  const [data, setData] = useState<PortfolioData>({ projects: [], skillCategories: [] });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/portfolio-data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handleProjectChange = (index: number, field: keyof Omit<Project, 'image'>, value: string) => {
    const newData = { ...data };
    (newData.projects[index] as any)[field] = value;
    setData(newData);
  };

  const handleSkillChange = (index: number, skillIndex: number, value: string) => {
    const newData = { ...data };
    newData.skillCategories[index].skills[skillIndex] = value;
    setData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    const res = await fetch('/api/portfolio-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus('Saved successfully!');
    } else {
      setStatus('Error saving data.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={project.id} className="mb-4 p-4 border rounded">
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          </div>
        ))}

        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        {data.skillCategories.map((category, index) => (
          <div key={category.title} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{category.title}</h3>
            {category.skills.map((skill, skillIndex) => (
              <input
                key={skillIndex}
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, skillIndex, e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
            ))}
          </div>
        ))}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
        {status && <p className="mt-4">{status}</p>}
      </form>
    </div>
  );
}
