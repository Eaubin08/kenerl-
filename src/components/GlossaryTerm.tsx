import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

const glossary: { [key: string]: string } = {
  "Nœud": "Un ordinateur participant au réseau Obsidia. Chaque nœud vote indépendamment pour valider une décision.",
  "Lean 4": "Un langage mathématique qui permet de prouver qu'un code est correct à 100%, comme une démonstration en algèbre.",
  "Invariant": "Une règle absolue que le système ne peut jamais enfreindre. Exemple : le solde d'un compte ne peut jamais être négatif.",
  "Racine Merkle": "Une empreinte digitale unique de tout le système. Si une seule règle change, l'empreinte change aussi — la fraude devient détectable.",
  "Merkle Seal": "Une empreinte digitale unique de tout le système. Si une seule règle change, l'empreinte change aussi — la fraude devient détectable.",
  "X-108": "Un verrou temporel de 108 secondes imposé avant toute action irréversible. Rend les attaques automatisées impossibles.",
  "Délai X-108": "Un verrou temporel de 108 secondes imposé avant toute action irréversible. Rend les attaques automatisées impossibles.",
  "Déterministe": "Un système qui donne toujours exactement le même résultat pour une même situation. Zéro surprise, zéro comportement aléatoire.",
  "Vote N4": "Protocole de validation où chaque décision doit être approuvée par plusieurs nœuds indépendants, chacun fournissant une preuve mathématique.",
  "OS2 Filter": "Le filtre d'entrée du noyau. Il rejette toute donnée incertaine ou probabiliste avant même qu'elle n'atteigne le moteur de décision.",
  "Sigma Engine": "Le moteur de stabilité d'Obsidia. Il surveille en temps réel que les métriques du système restent dans les limites définies.",
  "Preuve formelle": "Une démonstration mathématique rigoureuse qu'un code ne peut pas produire un résultat incorrect, quelle que soit la situation.",
  "TLA+": "Un langage de spécification formelle utilisé pour modéliser et vérifier le comportement du système sur des millions d'états.",
  "RFC 3161": "Standard international d'horodatage cryptographique. Prouve qu'un document existait à un instant précis et n'a pas été modifié."
};

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const definition = glossary[term] || "Définition non disponible.";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
    >
      <span className="border-b border-dotted border-obsidia-accent">
        {children || term}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.span
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-black border border-obsidia-accent text-white text-[13px] leading-relaxed shadow-xl pointer-events-none block"
          >
            {definition}
            {/* Tooltip Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-obsidia-accent" />
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-black" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GlossaryTerm;
