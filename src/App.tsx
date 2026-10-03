/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { LanguagesSection } from './components/LanguagesSection';
import { Achievements } from './components/Achievements';
import { Volunteering } from './components/Volunteering';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenCvModal={() => setCvModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section */}
        <Hero onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 3. About Section */}
        <About />

        {/* 4. Featured Projects Section (01 Systolic Array, 02 RV32I RISC-V, 03 Formula Student) */}
        <ProjectsSection />

        {/* 5. Experience Section */}
        <Experience />

        {/* 6. Technical Skills Matrix */}
        <Skills />

        {/* 6.5 Languages I Know Section */}
        <LanguagesSection />

        {/* 7. Honors & Achievements */}
        <Achievements />

        {/* 8. Volunteering & Outreach */}
        <Volunteering />

        {/* 9. CV CTA Section & 10. Contact Section */}
        <Contact onOpenCvModal={() => setCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Curriculum Vitae Full Inspection Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
