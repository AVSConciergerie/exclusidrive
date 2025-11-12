import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC<{ scrollContainerRef: React.RefObject<HTMLDivElement> }> = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      // Show button when scrolled down more than half the viewport height
      if (scrollContainer.scrollTop > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);

    return () => {
      scrollContainer.removeEventListener('scroll', toggleVisibility);
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-amber-400/80 dark:bg-amber-500/90 text-black shadow-lg hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
