import { Header } from '@/components/portfolio/header';
import { HeroSection } from '@/components/portfolio/hero-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import Qualifications from '@/components/qualifications'; // Corrected import
import { AiReviewSection } from '@/components/portfolio/ai-review-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { Footer } from '@/components/portfolio/footer';
import { education, certifications } from '@/lib/data'; // Ensure you have this data export

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <Qualifications education={education} certifications={certifications} />
        <AiReviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
