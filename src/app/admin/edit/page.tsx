'use client';

import { useState, useEffect } from 'react';
import type { Project, SkillCategory, Education, Certification } from '@/lib/definitions';

interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  projects: Omit<Project, 'image'>[];
  skillCategories: SkillCategory[];
  education: Education[];
  certifications: Certification[];
}

export default function EditPortfolio() {
  const [data, setData] = useState<PortfolioData>({ name: '', role: '', bio: '', projects: [], skillCategories: [], education: [], certifications: [] });
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/portfolio-data')
        .then(res => res.json())
        .then(data => setData(data));
    }
  }, [isAuthenticated]);

  const handleFieldChange = (field: keyof PortfolioData, value: string) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleProjectChange = (index: number, field: keyof Omit<Project, 'image'>, value: string | string[]) => {
    const newData = { ...data };
    (newData.projects[index] as any)[field] = value;
    setData(newData);
  };

  const handleSkillChange = (catIndex: number, skillIndex: number, value: string) => {
    const newData = { ...data };
    newData.skillCategories[catIndex].skills[skillIndex] = value;
    setData(newData);
  };
  
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newData = { ...data };
    newData.education[index][field] = value;
    setData(newData);
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const newData = { ...data };
    newData.certifications[index][field] = value;
    setData(newData);
  };


  const addProject = () => {
    const newData = { ...data };
    newData.projects.push({ id: '', title: '', description: '', tags: [], technicalDescription: '', liveUrl: '', sourceUrl: '', imageUrl: '' });
    setData(newData);
  };

  const removeProject = (index: number) => {
    const newData = { ...data };
    newData.projects.splice(index, 1);
    setData(newData);
  };

  const addSkill = (catIndex: number) => {
    const newData = { ...data };
    newData.skillCategories[catIndex].skills.push('');
    setData(newData);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newData = { ...data };
    newData.skillCategories[catIndex].skills.splice(skillIndex, 1);
    setData(newData);
  };
  
  const addEducation = () => {
    const newData = { ...data };
    newData.education.push({ institution: '', degree: '', dateRange: '', description: '' });
    setData(newData);
  };

  const removeEducation = (index: number) => {
    const newData = { ...data };
    newData.education.splice(index, 1);
    setData(newData);
  };

  const addCertification = () => {
    const newData = { ...data };
    newData.certifications.push({ name: '', issuingOrganization: '', date: '', url: '' });
    setData(newData);
  };

  const removeCertification = (index: number) => {
    const newData = { ...data };
    newData.certifications.splice(index, 1);
    setData(newData);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    const res = await fetch('/api/portfolio-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, password }),
    });
    if (res.ok) {
      setStatus('Saved successfully!');
    } else {
      setStatus('Error saving data.');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password') { // Replace with a secure check
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <form onSubmit={handlePasswordSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Edit Portfolio</h1>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={data.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Your Role"
                value={data.role}
                onChange={(e) => handleFieldChange('role', e.target.value)}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Bio"
                value={data.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                className="w-full mt-4 p-2 bg-gray-600 border border-gray-500 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button type="button" onClick={addProject} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Add Project
              </button>
            </div>

            {data.projects.map((project, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={project.imageUrl}
                    onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Live URL"
                    value={project.liveUrl}
                    onChange={(e) => handleProjectChange(index, 'liveUrl', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Source URL"
                    value={project.sourceUrl}
                    onChange={(e) => handleProjectChange(index, 'sourceUrl', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={project.tags.join(',')}
                    onChange={(e) => handleProjectChange(index, 'tags', e.target.value.split(','))}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  className="w-full mt-4 p-2 bg-gray-600 border border-gray-500 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Technical Description"
                  value={project.technicalDescription}
                  onChange={(e) => handleProjectChange(index, 'technicalDescription', e.target.value)}
                  className="w-full mt-4 p-2 bg-gray-600 border border-gray-500 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => removeProject(index)} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Remove Project
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Education</h2>
              <button type="button" onClick={addEducation} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Add Education
              </button>
            </div>

            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Date Range"
                    value={edu.dateRange}
                    onChange={(e) => handleEducationChange(index, 'dateRange', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  className="w-full mt-4 p-2 bg-gray-600 border border-gray-500 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => removeEducation(index)} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Remove Education
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Certifications</h2>
              <button type="button" onClick={addCertification} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Add Certification
              </button>
            </div>

            {data.certifications.map((cert, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuingOrganization}
                    onChange={(e) => handleCertificationChange(index, 'issuingOrganization', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                  <input
                    type="text"
                    placeholder="URL"
                    value={cert.url}
                    onChange={(e) => handleCertificationChange(index, 'url', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button type="button" onClick={() => removeCertification(index)} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Remove Certification
                </button>
              </div>
            ))}
          </div>


          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            {data.skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(catIndex, skillIndex, e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button type="button" onClick={() => removeSkill(catIndex, skillIndex)} className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded-full transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => addSkill(catIndex)} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Add Skill
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end items-center">
            {status && <p className="mr-4 text-gray-400">{status}</p>}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
