import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Counter: React.FC = () => {
    const target = 8754;
    const max = 12500;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * target);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animateCount);
    }, [target]);

    const percentage = (count / max) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <div className="text-center mb-2 font-montserrat text-lg text-gray-600 dark:text-gray-300">
                Inscrits jusqu’à présent : <span className="font-bold font-orbitron text-gray-900 dark:text-white">{count.toLocaleString('fr-FR')}</span> / {max.toLocaleString('fr-FR')}
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800/50 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700/30 relative shadow-inner">
                <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-2 bg-white/50 rounded-full transform -skew-x-12"></div>
                </div>
                <div 
                    className="absolute top-0 h-full rounded-full bg-amber-400 blur-md"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};


const Header: React.FC = () => {
    return (
        <header className="relative min-h-screen flex items-center justify-center text-center overflow-hidden snap-start">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
                src="https://videos.pexels.com/video-files/4434246/4434246-hd_1920_1080_30fps.mp4"
                poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
            />
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 dark:via-black/70 to-white dark:to-[#101010] z-1"></div>
            <div className="relative z-10 px-4">
                <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white glow-gold tracking-wider">
                    ExclusiDrive
                </h1>
                <p className="font-montserrat text-lg md:text-xl mt-4 text-gray-600 dark:text-gray-300">
                    Le bon plan qui roule tout seul.
                </p>
                <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-500 dark:text-gray-400">
                    Accédez à un véhicule neuf et à des services de conciergerie sur mesure, simple et sécurisé.
                </p>
                
                <a href="#inscription" className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a1a1a] font-bold font-orbitron rounded-full shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300">
                    Je m’inscris →
                </a>
                
                <Counter />
            </div>
        </header>
    );
};

export default Header;