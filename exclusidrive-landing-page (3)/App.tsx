import React, { useState, useRef } from 'react';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import SignupForm from './components/SignupForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import PrivacyModal from './components/PrivacyModal';
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  const [isLegalModalOpen, setLegalModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CustomCursor />
      <div 
        ref={scrollContainerRef}
        className="bg-white dark:bg-[#101010] text-gray-800 dark:text-gray-200 h-screen overflow-y-scroll snap-y snap-mandatory overflow-x-hidden transition-colors duration-300"
      >
        <div className="bg-animated-lines"></div>
        
        <Header />
        <HowItWorks />
        <Benefits />
        <SignupForm />
        <Footer 
          onLegalClick={() => setLegalModalOpen(true)}
          onPrivacyClick={() => setPrivacyModalOpen(true)}
        />

      </div>
      <ScrollToTopButton scrollContainerRef={scrollContainerRef} />
      <LegalModal isOpen={isLegalModalOpen} onClose={() => setLegalModalOpen(false)} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </>
  );
};

export default App;