import React from 'react';

const PrivacyModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="font-orbitron text-2xl font-bold mb-6 text-gray-900 dark:text-white">Politique de Confidentialité</h2>
                
                <div className="prose dark:prose-invert max-w-none font-montserrat text-sm text-gray-600 dark:text-gray-300">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">1️⃣ Qui sommes-nous ?</h4>
                    <p>Le site AVSConciergerie.com est édité par :<br />
                    AVSConciergerie – Entreprise individuelle<br />
                    Titulaire : Samuel Frédéric Olivier LAPRA<br />
                    Adresse : 83 chemin Notre-Dame de la Paix, La Plaine des Cafres, 97418 Le Tampon – La Réunion (France)<br />
                    Email : contact@avsconciergerie.com<br />
                    SIREN : 792 300 568 – RCS Saint-Pierre de La Réunion</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">2️⃣ Données que nous collectons</h4>
                    <p>Nous collectons uniquement les données strictement nécessaires au bon fonctionnement de nos services :</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Nom et prénom</li>
                        <li>Adresse e-mail</li>
                        <li>Numéro de téléphone (si fourni volontairement)</li>
                        <li>Données de connexion (adresse IP, navigateur, appareil)</li>
                        <li>Informations liées à votre participation à nos offres (ExclusiDrive / 10S50)</li>
                        <li>Historique de vos souhaits et contributions</li>
                    </ul>
                    <p>Nous ne collectons aucune donnée sensible (religion, santé, opinions politiques, etc.).</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">3️⃣ Finalités de la collecte</h4>
                    <p>Ces informations sont utilisées pour :</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Gérer vos inscriptions et votre compte utilisateur</li>
                        <li>Traiter vos souhaits et contributions</li>
                        <li>Vous informer de l’avancement des offres et des mises à jour</li>
                        <li>Garantir la sécurité du site et prévenir les fraudes</li>
                        <li>Respecter nos obligations légales (comptabilité, gestion client)</li>
                    </ul>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">4️⃣ Base légale du traitement</h4>
                    <p>Le traitement de vos données repose sur :</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Votre consentement (case à cocher lors de l’inscription)</li>
                        <li>L’exécution du contrat (participation à nos offres)</li>
                        <li>Nos obligations légales (fiscalité, facturation)</li>
                    </ul>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">5️⃣ Durée de conservation</h4>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Données d’inscription : conservées tant que vous utilisez nos services.</li>
                        <li>Données de facturation : conservées 10 ans conformément à la loi comptable.</li>
                        <li>Données marketing (newsletter) : jusqu’à désinscription.</li>
                    </ul>
                    <p>Vous pouvez demander la suppression de vos données à tout moment (sauf données légales obligatoires).</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">6️⃣ Partage des données</h4>
                    <p>Vos données sont strictement confidentielles. Elles ne sont jamais vendues ni louées à des tiers.</p>
                    <p>Elles peuvent être partagées uniquement avec :</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Nos prestataires techniques (hébergeur LWS, outils e-mail, passerelles de paiement PayPal / Stripe)</li>
                        <li>Nos partenaires contractuels pour la réalisation de vos souhaits (dans le cadre de 10S50)</li>
                    </ul>
                    <p>Tous nos prestataires respectent les obligations du Règlement Général sur la Protection des Données (RGPD).</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">7️⃣ Sécurité des données</h4>
                    <p>Nous utilisons :</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Certificat SSL (https)</li>
                        <li>Hébergement sécurisé LWS (serveurs situés en France)</li>
                        <li>Sauvegardes régulières</li>
                        <li>Mots de passe chiffrés et accès restreint aux administrateurs</li>
                    </ul>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">8️⃣ Vos droits</h4>
                    <p>Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Droit d’accès à vos données</li>
                        <li>Droit de rectification</li>
                        <li>Droit à l’effacement (“droit à l’oubli”)</li>
                        <li>Droit d’opposition</li>
                        <li>Droit à la portabilité</li>
                        <li>Droit de limitation du traitement</li>
                    </ul>
                    <p>Pour exercer vos droits, envoyez un e-mail à : dpo@avsconciergerie.com<br />
                    ou un courrier à :<br />
                    AVSConciergerie – Samuel LAPRA<br />
                    83 chemin Notre-Dame de la Paix, 97418 Le Tampon – La Réunion, France.</p>
                    <p>Nous répondrons sous 30 jours maximum.</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">9️⃣ Cookies</h4>
                    <p>Le site AVSConciergerie.com utilise des cookies à des fins :</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Techniques (navigation, sécurité, sessions)</li>
                        <li>Statistiques (analyse de fréquentation via Google Analytics ou équivalent)</li>
                        <li>Personnalisation (préférences utilisateur, langue)</li>
                    </ul>
                    <p>Lors de votre première visite, un bandeau vous permet d’accepter, de refuser ou de personnaliser les cookies. Vous pouvez à tout moment modifier votre consentement via votre navigateur.</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">🔟 Modifications de la politique</h4>
                    <p>Cette politique peut être mise à jour pour suivre les évolutions légales ou techniques. La date de dernière mise à jour figure en bas de page.</p>
                    <p><em>Dernière mise à jour : octobre 2025</em></p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;