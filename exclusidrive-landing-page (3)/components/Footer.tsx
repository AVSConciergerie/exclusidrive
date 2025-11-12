import React from 'react';

interface FooterProps {
  onLegalClick: () => void;
  onPrivacyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onPrivacyClick }) => {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm py-8 snap-end border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          
          <div className="font-orbitron text-lg font-bold text-gray-800 dark:text-gray-200">
            ExclusiDrive <span className="font-montserrat font-normal text-gray-600 dark:text-gray-400">by AVSConciergerie</span>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <button onClick={onLegalClick} className="hover:text-amber-500 transition-colors">Mentions Légales</button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={onPrivacyClick} className="hover:text-amber-500 transition-colors">Politique de Confidentialité</button>
          </div>
          
          <p className="text-xs text-gray-500">
            © 2025 ExclusiDrive by AVSConciergerie. Tous droits réservés.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;