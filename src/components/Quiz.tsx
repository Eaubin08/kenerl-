import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "Utilisez-vous des agents IA ou des systèmes automatisés pour gérer des actifs critiques (fonds, données, machines) ?",
    desc: "Si l'action est automatique, le risque d'exécution erronée est immédiat et sans filtre humain.",
    icon: Zap
  },
  {
    question: "Craignez-vous qu'une 'hallucination' d'IA ou un bug de code puisse vider une trésorerie en quelques millisecondes ?",
    desc: "C'est le problème de la 'boîte noire' : l'impossibilité de prédire ou d'arrêter une action fatale instantanée.",
    icon: AlertTriangle
  },
  {
    question: "Avez-vous besoin de prouver mathématiquement l'intégrité de chaque décision prise par vos systèmes ?",
    desc: "La conformité et l'audit exigent souvent une trace immuable et vérifiable de 'pourquoi' une action a été autorisée.",
    icon: ShieldCheck
  },
  {
    question: "Votre système actuel peut-il bloquer une action malveillante AVANT qu'elle ne transforme le réel ?",
    desc: "La plupart des systèmes détectent l'erreur après coup. Obsidia intercepte l'intention avant l'exécution.",
    icon: XCircle
  },
  {
    question: "Souhaitez-vous imposer des 'invariants' (règles incassables) que même vos administrateurs ne peuvent contourner ?",
    desc: "Le déterminisme absolu garantit que les règles critiques sont gravées dans le noyau, au-delà de l'erreur humaine.",
    icon: CheckCircle2
  }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for start screen
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(-1);
    setAnswers([]);
    setShowResult(false);
  };

  const score = answers.filter(a => a).length;

  return (
    <div className="w-full max-w-4xl mx-auto bg-obsidia-ink text-obsidia-bg rounded-3xl overflow-hidden shadow-2xl border border-obsidia-accent/20">
      <AnimatePresence mode="wait">
        {currentStep === -1 && !showResult && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-12 md:p-20 text-center"
          >
            <div className="inline-block p-4 bg-obsidia-accent/10 rounded-full mb-8">
              <ShieldCheck className="w-12 h-12 text-obsidia-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic uppercase tracking-tighter">
              Votre infrastructure est-elle <span className="text-obsidia-accent">gouvernée</span> ?
            </h2>
            <p className="text-lg opacity-60 mb-10 max-w-xl mx-auto font-light">
              Répondez à 5 questions rapides pour évaluer votre exposition au risque d'exécution et découvrir comment Obsidia peut verrouiller vos systèmes.
            </p>
            <button 
              onClick={() => setCurrentStep(0)}
              className="px-12 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 mx-auto"
            >
              Démarrer le test <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {currentStep >= 0 && !showResult && (
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-12 md:p-20"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent">Question {currentStep + 1} / {questions.length}</div>
              <div className="flex gap-2">
                {questions.map((_, i) => (
                  <div key={i} className={`w-8 h-1 transition-all duration-500 ${currentStep >= i ? "bg-obsidia-accent" : "bg-obsidia-bg/10"}`} />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-6 bg-obsidia-accent/10 rounded-2xl">
                {(() => {
                  const Icon = questions[currentStep].icon;
                  return Icon ? <Icon className="w-10 h-10 text-obsidia-accent" /> : null;
                })()}
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 italic leading-tight">
                  {questions[currentStep].question}
                </h3>
                <p className="text-obsidia-bg/40 text-sm leading-relaxed mb-10 italic">
                  {questions[currentStep].desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-5 border-2 border-obsidia-accent text-obsidia-accent font-bold uppercase tracking-widest hover:bg-obsidia-accent hover:text-obsidia-bg transition-all"
                  >
                    Oui
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="flex-1 py-5 border-2 border-obsidia-bg/20 text-obsidia-bg/60 font-bold uppercase tracking-widest hover:border-obsidia-bg/40 transition-all"
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showResult && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 md:p-20 text-center"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent mb-6">Résultat de l'analyse</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic uppercase tracking-tighter">
              {score >= 3 ? "Obsidia est un " : "Obsidia est un "}
              <span className="text-obsidia-accent">{score >= 3 ? "Impératif Vital" : "Atout Stratégique"}</span>
            </h2>
            
            <div className="max-w-2xl mx-auto mb-12 p-8 border border-obsidia-accent/20 bg-obsidia-accent/5 rounded-2xl">
              <p className="text-lg leading-relaxed opacity-80 mb-6">
                {score >= 3 
                  ? "Votre infrastructure présente des vecteurs de risque critiques. L'automatisation sans middleware de gouvernance déterministe vous expose à des pertes irréversibles." 
                  : "Bien que vos systèmes semblent sous contrôle, l'ajout d'une couche de preuve mathématique et d'invariants temporels renforcerait votre résilience opérationnelle."}
              </p>
              <div className="text-sm italic opacity-40">
                Score de vulnérabilité : {score}/{questions.length} points de contrôle identifiés.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="px-10 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4">
                Demander une analyse d'impact <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={resetQuiz}
                className="px-10 py-5 border border-obsidia-bg/20 hover:border-obsidia-bg/40 transition-colors uppercase tracking-widest text-sm font-bold"
              >
                Recommencer le test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
