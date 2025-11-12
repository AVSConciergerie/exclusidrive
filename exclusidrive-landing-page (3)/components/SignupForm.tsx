import React, { useState, useRef, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SparkleButton: React.FC<{ onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, children: React.ReactNode, disabled: boolean }> = ({ onClick, children, disabled }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createSparkle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button || disabled) return;

        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('span');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${e.clientX - button.offsetLeft}px`;
            sparkle.style.top = `${e.clientY - button.offsetTop}px`;
            sparkle.style.width = `${Math.random() * 3 + 1}px`;
            sparkle.style.height = sparkle.style.width;
            button.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 700);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        createSparkle(e);
        onClick(e);
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            disabled={disabled}
            type="submit"
            className="sparkle-button w-full mt-6 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1a1a1a] font-bold font-orbitron rounded-full shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
            {children}
        </button>
    );
};

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.251 45 30.861 45 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const SignupForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [packages, setPackages] = useState(1);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showManualForm, setShowManualForm] = useState(false);
    const [isGoogleSignInDisabled, setIsGoogleSignInDisabled] = useState(false);
    const [googleSignInMessage, setGoogleSignInMessage] = useState('');

    useEffect(() => {
        const isSupported = ['http:', 'https:', 'chrome-extension:'].includes(window.location.protocol);
        if (!isSupported) {
            setIsGoogleSignInDisabled(true);
            setGoogleSignInMessage('Indisponible dans cet aperçu, mais fonctionnera sur le site final.');
        }
    }, []);

    const handleGoogleSignIn = async () => {
        setStatus('submitting');
        setMessage('');
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;

            if (user && user.displayName && user.email) {
                await db.collection("inscriptions").add({
                    nomComplet: user.displayName,
                    email: user.email,
                    packages: packages,
                    dateInscription: firebase.firestore.Timestamp.now()
                });
                setStatus('success');
                setMessage(`Bienvenue ${user.displayName} ! Votre inscription est confirmée.`);
            } else {
                setStatus('error');
                setMessage('Informations utilisateur Google incomplètes.');
            }
        } catch (error: any) {
            console.error("Google Sign-In Error: ", error);
            setStatus('error');
            if (error.code === 'auth/operation-not-supported-in-this-environment') {
                 setMessage("La connexion Google n'est pas supportée dans cet environnement de prévisualisation.");
            } else {
                setMessage('Erreur de connexion avec Google. Veuillez réessayer.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setStatus('error');
            setMessage('Veuillez remplir tous les champs.');
            return;
        }
        setStatus('submitting');
        setMessage('');

        try {
            await db.collection("inscriptions").add({
                nomComplet: name,
                email: email,
                packages: packages,
                dateInscription: firebase.firestore.Timestamp.now()
            });
            setStatus('success');
            setMessage('Merci ! Votre inscription a bien été prise en compte.');
            setName('');
            setEmail('');
            setPackages(1);
            setShowManualForm(false);
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
            setMessage('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <section id="inscription" className="py-20 md:py-28 snap-start">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Rejoignez <span className="text-amber-500 glow-gold">l'Expérience</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Inscrivez-vous dès maintenant. C'est simple, rapide et sans engagement financier.</p>
                </div>

                <div className="max-w-xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700/50">
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 font-orbitron text-center">Choisissez votre nombre de packages</label>
                        <div className="flex items-center justify-center space-x-2 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full">
                            {[1, 2, 3].map(num => (
                                <button key={num} type="button" onClick={() => setPackages(num)} className={`w-full text-center px-4 py-2 rounded-full font-bold transition-colors duration-300 ${packages === num ? 'bg-amber-400 text-black shadow' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleSignInDisabled}
                        className="w-full flex items-center justify-center py-3 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700/50 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <GoogleIcon />
                        S'inscrire avec Google
                    </button>
                    {googleSignInMessage && <p className="mt-2 text-center text-xs text-gray-500">{googleSignInMessage}</p>}

                    {!showManualForm ? (
                        <div className="text-center my-6">
                            <button onClick={() => setShowManualForm(true)} className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors">
                                Ou continuer avec un e-mail
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center my-6">
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm font-semibold">Inscription Manuelle</span>
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-orbitron">Nom Complet</label>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="ex: Jean Dupont" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-orbitron">Email</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="ex: jean.dupont@email.com" required />
                                </div>
                                
                                <SparkleButton onClick={() => {}} disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Inscription en cours...' : 'Je m’inscris maintenant'}
                                </SparkleButton>
                            </form>
                        </>
                    )}

                    {message && (
                        <div className={`mt-4 text-center p-3 rounded-lg text-sm font-bold ${status === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                            {message}
                        </div>
                    )}
                    <p className="mt-6 text-center text-xs text-gray-500">
                        🔒 Aucun paiement n’est demandé avant l’atteinte du seuil d’inscriptions critiques.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
