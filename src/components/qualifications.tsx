'use client';

import type { Education, Certification } from '@/lib/definitions';

interface QualificationsProps {
  education: Education[];
  certifications: Certification[];
}

export default function Qualifications({ education, certifications }: QualificationsProps) {
  if (!education.length && !certifications.length) return null;

  return (
    <section id="qualifications" className="py-16 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Education & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {education.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                    <p className="text-blue-400 font-semibold">{edu.degree}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.dateRange}</p>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-white">{cert.name}</h4>
                    <p className="text-blue-400 font-semibold">{cert.issuingOrganization}</p>
                    <p className="text-gray-400 text-sm mb-2">{cert.date}</p>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Certificate</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
