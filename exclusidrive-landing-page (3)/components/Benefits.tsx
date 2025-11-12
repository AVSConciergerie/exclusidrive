import React, { useState, useEffect, useRef } from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    return (
        <div 
            ref={cardRef}
            className={`card-glow bg-gray-100 dark:bg-gray-800/90 text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50 transform group backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-400/20 hover:rotate-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="mb-4 text-amber-400 drop-shadow-[0_0_5px_#FFD700] group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="font-orbitron text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat">{description}</p>
        </div>
    );
};

const Benefits: React.FC = () => {
  const benefits = [
    { title: 'Véhicule Neuf Garanti', description: 'Accédez à un véhicule thermique, hybride ou électrique, selon vos préférences, sans les tracas de l’achat.', icon: <CarIcon /> },
    { title: 'Conciergerie Premium', description: 'Bénéficiez d’un service de conciergerie haut de gamme pour vos demandes, jusqu’à 50 € par requête.', icon: <StarIcon /> },
    { title: 'Sécurité Totale', description: 'Le service ne démarre que lorsque le seuil d’inscriptions est atteint, garantissant un modèle viable et sans risque.', icon: <ShieldIcon /> },
    { title: 'Webapp Intuitive', description: 'Une interface élégante et fluide pour gérer vos services, suivre votre véhicule et communiquer avec nous.', icon: <DeviceMobileIcon /> },
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 relative snap-start">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gradient-to-br from-gray-900 via-gray-800 to-black -skew-y-3 -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative text-center mb-12">
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Vos <span className="text-amber-400 glow-gold">Avantages</span> Exclusifs
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Plus qu'un véhicule, une expérience de sérénité.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((b, i) => (
                    <BenefitCard key={i} title={b.title} description={b.description} icon={b.icon} index={i} />
                ))}
            </div>
        </div>
    </section>
  );
};

// SVG Icons
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const DeviceMobileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);


export default Benefits;
