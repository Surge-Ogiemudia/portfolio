'use client';

import { personalInfo, skillCategories, projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function CVPage() {
  const downloadCV = () => {
    const cvElement = document.getElementById('cv-container');
    if (cvElement) {
      html2canvas(cvElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        if (height > pdfHeight) {
          const newPdf = new jsPDF('p', 'mm', 'a4');
          const pageHeight = newPdf.internal.pageSize.getHeight();
          let position = 0;
          let page = 1;
          while (position < canvasHeight) {
            const newCanvas = document.createElement('canvas');
            newCanvas.width = canvasWidth;
            newCanvas.height = pageHeight * (canvasWidth / pdfWidth);
            const ctx = newCanvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(canvas, 0, position, canvasWidth, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);
              if (page > 1) {
                newPdf.addPage();
              }
              newPdf.addImage(newCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pageHeight, undefined, 'FAST');
              position += newCanvas.height;
              page++;
            }
          }
          newPdf.save('cv.pdf');
        } else {
          pdf.addImage(imgData, 'PNG', 0, 0, width, height, undefined, 'FAST');
          pdf.save('cv.pdf');
        }
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button onClick={downloadCV}>
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
        </div>
        <div id="cv-container" className="bg-white p-8 shadow-lg">
          <header className="mb-8 border-b pb-4">
            <h1 className="text-4xl font-bold text-gray-800">{personalInfo.name}</h1>
            <p className="text-lg text-gray-600">{personalInfo.title}</p>
            <div className="text-sm text-gray-500 mt-2">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.socials.linkedin}</p>
              <p>{personalInfo.socials.github}</p>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Summary</h2>
            <p className="text-gray-600 leading-relaxed">{personalInfo.introduction}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Work Experience</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Self-Employed</p>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Education</h2>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Bachelor of Science in Computer Science (Self-Taught)</h3>
              <p className="text-sm text-gray-500 mb-2">Online Resources and Projects | 2023 - Present</p>
              <p className="text-gray-600 leading-relaxed">Intensive self-study program focusing on full-stack web development, AI integration, and product management.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    {category.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
