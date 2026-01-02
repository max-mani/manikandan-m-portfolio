'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import { ProfileImage } from '../sections/ProfileImage';
import { ContactButton } from './ContactButton';
import { MessageButton } from './MessageButton';
import { LandingView } from '../sections/LandingView';
import { AboutSection } from '../sections/AboutSection';
import { ProjectsGrid } from '../sections/ProjectsGrid';
import { ProjectDetails } from '../sections/ProjectDetails';
import { SkillsMatrix } from '../sections/SkillsMatrix';
import { ExperienceTimeline } from '../sections/ExperienceTimeline';
import { CTFShowcase } from '../sections/CTFShowcase';
import { CertificationsGrid } from '../sections/CertificationsGrid';
import { ContactModal } from '../sections/ContactModal';
import { MatrixRain } from '../effects/MatrixRain';

export function TopPanel() {
  const { currentView, currentProject } = useUI();

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsGrid />;
      case 'project':
        return <ProjectDetails projectId={currentProject || ''} />;
      case 'skills':
        return <SkillsMatrix />;
      case 'experience':
        return <ExperienceTimeline />;
      case 'ctfs':
        return <CTFShowcase />;
      case 'certifications':
        return <CertificationsGrid />;
      case 'contact':
        return <ContactModal />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="h-2/3 overflow-y-auto relative z-10">
      <div className="relative min-h-full">
        {/* Matrix Rain - Only in top panel area */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <MatrixRain />
        </div>
        
        <div className="flex flex-col md:flex-row relative z-10">
          {/* Column 1: Profile Image and Buttons */}
          <div className="w-full md:w-[25%] flex flex-col items-center justify-start pt-4 md:pt-12 p-3 md:p-8 space-y-3 md:space-y-4">
            <ProfileImage />
            <ContactButton />
            <MessageButton />
          </div>

          {/* Column 2: Dynamic Content - Full width minus profile column */}
          <div className="w-full md:w-[75%] p-3 md:p-8 flex-1 relative z-10">
            <div className="relative">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

