import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Clock, Zap, AlertTriangle, CheckCircle2, ShieldAlert, Activity, Github, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import GlossaryTerm from "../components/GlossaryTerm";
import { CONFIG } from "../config";

const Fonctionnement = () => {
  const [countdown, setCountdown] = useState(108);
  const [sigmaData, setSigmaData] = useState<any[]>([]);
  const [selectedCycleStep, setSelectedCycleStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<string>('human');
  const [gateStatus, setGateStatus] = useState<'idle' | 'pending' | 'authorized' | 'cancelled'>('idle');
  const [sigmaLogs, setSigmaLogs] = useState<string[]>([]);
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    {
      id: 'human',
      title: 'Action Humaine',
      subtitle: 'Validation de l\'Intention',
      description: 'Un utilisateur transfère des fonds. Le système vérifie la patience et la stabilité.',
      x108: {
        check: 'Délai de 108s respecté',
        logic: 'La vélocité est compatible avec une interaction humaine. Aucun script d\'automatisation détecté.',
        status: 'success'
      },
      sigma: {
        check: 'Invariants Stables',
        logic: 'La télémétrie réseau ne montre aucune anomalie de liquidité ou de charge pendant le sas.',
        status: 'success'
      },
      decision: 'Action Autorisée',
      why: 'La preuve de patience (X-108) est fournie et l\'intégrité système (Sigma) est maintenue.'
    },
    {
      id: 'bot',
      title: 'Attaque Bot',
      subtitle: 'Détection de Vélocité',
      description: 'Un bot tente d\'exécuter une transaction instantanée pour front-runner le marché.',
      x108: {
        check: 'Bypass Temporel Détecté',
        logic: 'Tentative d\'exécution en < 1s. Violation critique du protocole de décompression d\'intention.',
        status: 'fail'
      },
      sigma: {
        check: 'Quarantaine Préventive',
        logic: 'Sigma verrouille l\'accès au noyau suite à la violation du protocole X-108.',
        status: 'fail'
      },
      decision: 'Action Révoquée',
      why: 'Le protocole X-108 a bloqué l\'automatisme avant même que Sigma n\'ait à analyser le système.'
    },
    {
      id: 'instability',
      title: 'Flash Loan / Choc',
      subtitle: 'Analyse d\'Invariants',
      description: 'Une action est initiée pendant qu\'une attaque de prêt éclair déstabilise les pools.',
      x108: {
        check: 'Sas Temporel Actif',
        logic: 'L\'utilisateur attend patiemment, mais le contexte externe est corrompu.',
        status: 'pending'
      },
      sigma: {
        check: 'Rupture d\'Invariant',
        logic: 'Détection d\'une variation anormale de liquidité (> 40% en 2s). Risque de corruption du noyau.',
        status: 'fail'
      },
      decision: 'Action Révoquée',
      why: 'Bien que le délai X-108 soit respecté, Sigma détecte une instabilité qui rend l\'action dangereuse.'
    }
  ];


  const runSimulation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    setActiveScenario(scenarioId);
    setSimStep(0);
    setIsSimulating(true);
    setGateStatus('pending');

    // Fast simulation for visual feedback
    setTimeout(() => {
      setSimStep(1);
      setTimeout(() => {
        setSimStep(2);
        setIsSimulating(false);
        setGateStatus(scenario.id === 'human' ? 'authorized' : 'cancelled');
      }, 800);
    }, 800);
  };

  const resetLab = () => {
    setActiveScenario(null);
    setSimStep(0);
    setIsSimulating(false);
    setGateStatus('idle');
    setSigmaLogs(["En attente de sélection de scénario..."]);
  };

  const cycleSteps = [
    {
      title: "Détection & Filtrage",
      description: "L'intention est capturée et passée au travers d'un filtre de pureté absolue. Tout ce qui est incertain ou probabiliste est immédiatement rejeté.",
      icon: <Zap className="w-6 h-6" />,
      status: "RED/ORANGE"
    },
    {
      title: "Scellage Temporel",
      description: <>Si l'action est irréversible, elle est verrouillée dans la porte <GlossaryTerm term="X-108">X-108</GlossaryTerm>. Ce délai de 108s empêche toute exécution impulsive ou automatisée malveillante.</>,
      icon: <Clock className="w-6 h-6" />,
      status: "ORANGE"
    },
    {
      title: "Consensus Sigma",
      description: <>Le moteur <GlossaryTerm term="Sigma Engine">Sigma</GlossaryTerm> analyse la stabilité du système. Si une dérive ou un choc est détecté pendant le délai X-108, l'action est annulée.</>,
      icon: <Activity className="w-6 h-6" />,
      status: "ORANGE/GREEN"
    },
    {
      title: "Preuve de Merkle",
      description: <>Une fois validée, l'action est scellée mathématiquement. Une preuve d'intégrité est générée via une <GlossaryTerm term="Racine Merkle">Racine Merkle</GlossaryTerm>, rendant l'exécution auditable et immuable.</>,
      icon: <CheckCircle2 className="w-6 h-6" />,
      status: "GREEN"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink font-sans selection:bg-obsidia-accent selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <header className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-obsidia-accent"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Architecture Déterministe</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
              Comment <br />
              <span className="text-obsidia-accent">Obsidia</span> Décide.
            </h1>
            <p className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed font-light max-w-2xl">
              Obsidia n'est pas une IA. C'est un <GlossaryTerm term="Déterministe">correcteur mathématique</GlossaryTerm> qui s'insère entre l'intention et l'action pour garantir la sécurité absolue.
            </p>
          </motion.div>
        </header>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            COMMENT ON EN EST ARRIVÉ LÀ
          </div>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Obsidia est né d'un constat simple : la perte de responsabilité. Quand un algorithme prend une décision catastrophique, personne n'est coupable. En imposant le délai X-108 et la validation Sigma, nous réintroduisons la causalité et la preuve dans l'exécution numérique. Nous rendons le système responsable de son propre déterminisme.
          </p>
        </div>

        {/* Section 1: Le Cycle de Gouvernance */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">01. Le Cycle de Gouvernance</h2>
              <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Le pipeline de décision en 4 étapes</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            {cycleSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedCycleStep(idx)}
                className={`p-8 border cursor-pointer transition-all duration-500 relative overflow-hidden group ${
                  selectedCycleStep === idx 
                    ? "bg-obsidia-ink text-obsidia-bg border-obsidia-ink" 
                    : "bg-obsidia-blue/5 border-obsidia-line hover:border-obsidia-accent"
                }`}
              >
                <div className={`text-4xl font-bold italic mb-6 opacity-20 ${selectedCycleStep === idx ? "text-obsidia-bg" : "text-obsidia-ink"}`}>
                  0{idx + 1}
                </div>
                <div className={`mb-6 ${selectedCycleStep === idx ? "text-obsidia-accent" : "text-obsidia-ink"}`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight italic mb-4">{step.title}</h3>
                <p className={`text-sm leading-relaxed ${selectedCycleStep === idx ? "text-obsidia-bg/60" : "text-obsidia-ink/60"}`}>
                  {step.description}
                </p>
                
                {/* Status Indicator */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex gap-1">
                    {step.status.split('/').map((color, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${
                        color === 'RED' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : 
                        color === 'ORANGE' ? "bg-obsidia-accent shadow-[0_0_8px_rgba(242,125,38,0.5)]" : 
                        "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      }`} />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedCycleStep === idx ? "text-obsidia-bg/40" : "text-obsidia-ink/40"}`}>
                    {step.status === "RED/ORANGE" ? "Filtrage Critique" : 
                     step.status === "ORANGE" ? "Sas Temporel" : 
                     step.status === "ORANGE/GREEN" ? "Analyse Sigma" : "Validation Finale"}
                  </span>
                </div>

                {selectedCycleStep === idx && (
                  <motion.div 
                    layoutId="cycle-active"
                    className="absolute bottom-0 left-0 w-full h-1 bg-obsidia-accent"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </section>


        {/* Section 2: Matrice de Décision (Simulateur) */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">02. Matrice de Décision</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Simulation directe des couches de protection</p>
          </div>

          <div className="bg-obsidia-bg border border-obsidia-line rounded-2xl overflow-hidden shadow-xl">
            {/* Scenario Selector Tabs */}
            <div className="flex border-b border-obsidia-line bg-white/5">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => runSimulation(s.id)}
                  className={`flex-1 py-6 px-4 text-center transition-all relative ${
                    activeScenario === s.id 
                      ? "bg-white/10 text-obsidia-ink font-bold" 
                      : "text-obsidia-ink/40 hover:text-obsidia-ink/60"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest mb-1">Cas {s.id === 'human' ? '01' : s.id === 'bot' ? '02' : '03'}</div>
                  <div className="text-sm italic">{s.title}</div>
                  {activeScenario === s.id && (
                    <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 w-full h-1 bg-obsidia-accent" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Visual Logic Board */}
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          simStep >= 1 
                            ? scenarios.find(s => s.id === activeScenario)?.x108.status === 'success' ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                            : "bg-white/10 text-white/40"
                        }`}>
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Couche X-108 (Temps)</span>
                      </div>
                      {simStep >= 1 && (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          scenarios.find(s => s.id === activeScenario)?.x108.status === 'success' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {scenarios.find(s => s.id === activeScenario)?.x108.status === 'success' ? "VALIDÉ" : "REJETÉ"}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold italic mb-2 text-white">{scenarios.find(s => s.id === activeScenario)?.x108.check}</h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {scenarios.find(s => s.id === activeScenario)?.x108.logic}
                    </p>
                    <a 
                      href={`${CONFIG.GITHUB_REPO}/blob/main/X108.md`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent hover:underline flex items-center gap-2"
                    >
                      <Github className="w-3 h-3" />
                      Spécification X-108 <ArrowRight className="w-2 h-2" />
                    </a>
                  </div>

                  <div className="flex justify-center py-2">
                    <div className="w-[1px] h-8 bg-white/10" />
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          simStep >= 2 
                            ? scenarios.find(s => s.id === activeScenario)?.sigma.status === 'success' ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                            : "bg-white/10 text-white/40"
                        }`}>
                          <Activity className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Couche Sigma (Système)</span>
                      </div>
                      {simStep >= 2 && (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          scenarios.find(s => s.id === activeScenario)?.sigma.status === 'success' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {scenarios.find(s => s.id === activeScenario)?.sigma.status === 'success' ? "NOMINAL" : "ANOMALIE"}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold italic mb-2 text-white">{scenarios.find(s => s.id === activeScenario)?.sigma.check}</h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {scenarios.find(s => s.id === activeScenario)?.sigma.logic}
                    </p>
                    <a 
                      href={`${CONFIG.GITHUB_REPO}/tree/main/sigma`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent hover:underline flex items-center gap-2"
                    >
                      <Github className="w-3 h-3" />
                      Implémentation Sigma <ArrowRight className="w-2 h-2" />
                    </a>
                  </div>
                </div>

                {/* Decision & Explanation */}
                <div className="bg-white/5 border border-white/10 text-obsidia-ink p-10 rounded-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <ShieldAlert className="w-32 h-32" />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {simStep < 2 ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <div className="inline-block animate-spin mb-6">
                          <Activity className="w-12 h-12 text-obsidia-accent" />
                        </div>
                        <h3 className="text-xl font-bold uppercase italic tracking-widest">Calcul du Noyau...</h3>
                        <p className="text-white/40 text-xs mt-4">Analyse des invariants en cours</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10"
                      >
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            gateStatus === 'authorized' ? "bg-emerald-500" : "bg-red-500"
                          }`}>
                            {gateStatus === 'authorized' ? <CheckCircle2 className="w-6 h-6 text-white" /> : <ShieldAlert className="w-6 h-6 text-white" />}
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-obsidia-accent">Verdict Final</div>
                            <h3 className="text-3xl font-bold uppercase italic tracking-tight text-white">
                              {scenarios.find(s => s.id === activeScenario)?.decision}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Pourquoi cette décision ?</div>
                            <p className="text-lg font-light leading-relaxed italic text-white/90">
                              "{scenarios.find(s => s.id === activeScenario)?.why}"
                            </p>
                          </div>
                          
                          <div className="pt-6 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-[9px] uppercase text-white/30">Action</div>
                                <div className="text-xs font-mono text-white/70">{activeScenario === 'human' ? 'TRANSFERT_OK' : 'KILL_SIGNAL'}</div>
                              </div>
                              <div>
                                <div className="text-[9px] uppercase text-white/30">Intégrité</div>
                                <div className="text-xs font-mono text-white/70">{activeScenario === 'human' ? '100%_STABLE' : 'PROTECTION_ACTIVE'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Synthèse Comparative */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">03. Synthèse Comparative</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Vision directe de la logique décisionnelle</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-obsidia-ink text-left">
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">Scénario</th>
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">X-108 (Temporel)</th>
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">Sigma (Systémique)</th>
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">Décision</th>
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold">Raison du Noyau</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.id} className="border-b border-obsidia-line hover:bg-obsidia-blue/5 transition-colors group">
                    <td className="py-8 px-4">
                      <div className="font-bold italic text-lg">{s.title}</div>
                      <div className="text-[10px] text-obsidia-ink/40 uppercase tracking-widest mt-1">{s.subtitle}</div>
                    </td>
                    <td className="py-8 px-4">
                      <div className={`flex items-center gap-2 text-xs font-mono ${s.x108.status === 'success' ? 'text-emerald-600' : s.x108.status === 'fail' ? 'text-red-600' : 'text-obsidia-accent'}`}>
                        {s.x108.status === 'success' ? '✓' : s.x108.status === 'fail' ? '✗' : '⏳'} {s.x108.check}
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <div className={`flex items-center gap-2 text-xs font-mono ${s.sigma.status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {s.sigma.status === 'success' ? '✓' : '✗'} {s.sigma.check}
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        s.id === 'human' ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                      }`}>
                        {s.id === 'human' ? "Autorisé" : "Révoqué"}
                      </span>
                    </td>
                    <td className="py-8 px-4 max-w-xs">
                      <p className="text-xs text-obsidia-ink/60 leading-relaxed italic">
                        "{s.why}"
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final CTA / Summary */}
        <section className="bg-obsidia-bg border-t border-white/5 text-obsidia-ink p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/10 h-full"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold italic mb-8 leading-tight">
              La sécurité n'est pas une option, c'est un <GlossaryTerm term="Déterministe">déterminisme.</GlossaryTerm>
            </h2>
            <p className="text-lg text-white/60 mb-12 leading-relaxed">
              En combinant le contrôle temporel X-108 et la stabilité dynamique Sigma, Obsidia crée un environnement où l'erreur est bloquée dans le périmètre du noyau formel, sous hypothèses cryptographiques standards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-5 bg-obsidia-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-obsidia-accent/90 transition-all w-full sm:w-auto">
                Explorer le Noyau
              </button>
              <button className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-obsidia-bg transition-all w-full sm:w-auto">
                Lire le Livre Blanc
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Fonctionnement;
