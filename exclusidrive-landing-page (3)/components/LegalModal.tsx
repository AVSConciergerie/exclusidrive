import React from 'react';

const LegalModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
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
                <h2 className="font-orbitron text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mentions Légales & Conditions</h2>
                
                <div className="prose dark:prose-invert max-w-none font-montserrat text-sm text-gray-600 dark:text-gray-300">
                    <h3 className="font-orbitron text-xl font-bold mb-4 text-amber-500 dark:text-amber-400">Mentions Légales</h3>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Éditeur du site :</h4>
                    <p>AVSConciergerie<br />
                    Entreprise individuelle (auto-entrepreneur)<br />
                    Titulaire : Samuel Frédéric Olivier LAPRA<br />
                    Adresse : 83 chemin Notre-Dame de la Paix, La Plaine des Cafres, 97418 Le Tampon – La Réunion, France<br />
                    SIREN : 792 300 568 – RCS Saint-Pierre de La Réunion<br />
                    Activité déclarée : Conciergerie privée et services personnalisés<br />
                    Nationalité : Française<br />
                    Email : contact@avsconciergerie.com<br />
                    Téléphone : à venir<br />
                    Numéro de TVA intracommunautaire (si applicable) : Non applicable</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Responsable de la publication :</h4>
                    <p>M. Samuel LAPRA, entrepreneur individuel</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Hébergement du site :</h4>
                    <p>Le site www.avsconciergerie.com est hébergé par :<br />
                    LWS (Ligne Web Services SARL)<br />
                    10 Rue Penthièvre – 75008 Paris – France<br />
                    SIRET : 450 453 881 00010 – RCS Paris<br />
                    Téléphone : +33 (0)1 77 62 30 03<br />
                    Site web : https://www.lws.fr</p>

                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Propriété intellectuelle :</h4>
                    <p>Tout le contenu de AVSConciergerie.com (textes, images, graphismes, logos, etc.) est la propriété exclusive de AVSConciergerie. Le nom “ExclusiDrive” désigne une offre commerciale interne à AVSConciergerie. Toute reproduction est interdite sans autorisation écrite.</p>

                    <h4 className="font-bold text-amber-500 dark:text-amber-400">Conditions Générales d’Utilisation et de Service (CGU / CGS)</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Objet:</strong> Les présentes conditions encadrent l’utilisation du site et des services proposés, notamment l’offre ExclusiDrive.</li>
                        <li><strong>Définitions:</strong> Utilisateur, Contributeur, ExclusiDrive (Offre A2), Offre 10S50.</li>
                        <li><strong>Accès au service:</strong> L’accès est libre. Aucune contribution financière n’est demandée avant l’activation du programme ExclusiDrive (seuil de 12 500 inscriptions). Après ce seuil, participation volontaire de 5 €/semaine (max 1 300 € sur 5 ans).</li>
                        <li><strong>Fonctionnement des offres:</strong>
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>Offre ExclusiDrive (A2):</strong> Seuil 12 500 - 50 000 inscrits. Contribution 5€/semaine. Accès à un véhicule électrique neuf (valeur 50 000 €).</li>
                                <li><strong>Offre 10S50:</strong> Jusqu’à 10 souhaits de 50 € max. Facturation: montant fournisseur + 20% frais de conciergerie + 20€ frais fixes.</li>
                            </ul>
                        </li>
                        <li><strong>Garanties:</strong> Satisfait ou remboursé, plafond garanti (1 300 €), bonus fidélité, équité.</li>
                        <li><strong>Paiement et sécurité:</strong> Paiements via PayPal ou Stripe. Aucune donnée bancaire stockée.</li>
                        <li><strong>Données personnelles:</strong> Conformément au RGPD, droit d’accès, de rectification et de suppression via dpo@avsconciergerie.com. Données non revendues.</li>
                        <li><strong>Responsabilités:</strong> AVSConciergerie décline toute responsabilité en cas de mauvaise utilisation, interruption du site ou force majeure.</li>
                        <li><strong>Droit applicable:</strong> Droit français. Litiges soumis au tribunal de commerce de Saint-Pierre de La Réunion.</li>
                    </ol>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Résumé</h4>
                    <p>AVSConciergerie.com est l'opérateur unique de l'offre ExclusiDrive, un concept de conciergerie solidaire géré exclusivement par AVSConciergerie.</p>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;