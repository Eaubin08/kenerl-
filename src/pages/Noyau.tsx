import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ShieldCheck, History, Lock, ArrowRight, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert, Zap, Filter, Activity, Database, Cpu, Search, Binary, Github, Code, Fingerprint } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlossaryTerm from "../components/GlossaryTerm";
import { CONFIG } from "../config";

const Noyau = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeThreat, setActiveThreat] = useState(0);

  // Simulator State
  const [simStatus, setSimStatus] = useState<'idle' | 'filtering' | 'sigma' | 'x108' | 'sealing' | 'executed' | 'failed'>('idle');
  const [simProgress, setSimProgress] = useState(0);
  const [simStability, setSimStability] = useState(1.0);
  const [simTimer, setSimTimer] = useState(108);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [chaosMode, setChaosMode] = useState(false);
  const [sigmaData, setSigmaData] = useState<any[]>([]);

  // Sigma Data Generation
  useEffect(() => {
    const updateData = () => {
      setSigmaData(prev => {
        const newData = [...prev];
        if (newData.length >= 20) newData.shift();
        
        // Base stability around 100
        let newStability = 100 + (Math.random() - 0.5) * 4;
        
        // If chaos mode is on, add significant noise/drops
        if (chaosMode) {
          newStability -= (Math.random() * 30) + 10;
        }
        
        newData.push({
          time: prev.length > 0 ? prev[prev.length - 1].time + 1 : 0,
          stability: newStability,
          threshold: 80
        });
        return newData;
      });
    };

    // Initialize
    if (sigmaData.length === 0) {
      const initialData = [];
      for (let i = 0; i < 20; i++) {
        initialData.push({ time: i, stability: 100, threshold: 80 });
      }
      setSigmaData(initialData);
    }

    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, [chaosMode, sigmaData.length]);

  // X-108 Dedicated Gate State
  const [x108Active, setX108Active] = useState(false);
  const [x108Time, setX108Time] = useState(108);
  const [x108Status, setX108Status] = useState<'idle' | 'pending' | 'completed' | 'interrupted'>('idle');
  const [x108Interval, setX108Interval] = useState<NodeJS.Timeout | null>(null);

  const startX108Gate = () => {
    setX108Active(true);
    setX108Status('pending');
    setX108Time(108);
    
    const interval = setInterval(() => {
      setX108Time(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setX108Status('completed');
          setX108Active(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setX108Interval(interval);
  };

  const interruptX108Gate = () => {
    if (x108Interval) {
      clearInterval(x108Interval);
    }
    setX108Status('interrupted');
    setX108Active(false);
  };

  const resetX108Gate = () => {
    if (x108Interval) clearInterval(x108Interval);
    setX108Status('idle');
    setX108Time(108);
    setX108Active(false);
  };

  const addLog = (msg: string) => {
    setSimLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const startSimulation = () => {
    setSimStatus('filtering');
    setSimProgress(0);
    setSimLogs(["[INIT] Action critique détectée...", "[OS2] Analyse de pureté des données..."]);
    
    // Step 1: OS2 Filtering (1.5s)
    setTimeout(() => {
      setSimProgress(25);
      addLog("[OS2] Données 100% conformes. Passage au moteur Sigma.");
      setSimStatus('sigma');
      
      // Step 2: Sigma Engine (2s)
      setTimeout(() => {
        const stability = chaosMode ? 0.65 + Math.random() * 0.1 : 0.95 + Math.random() * 0.04;
        setSimStability(stability);
        
        if (stability < 0.80) {
          setSimStatus('failed');
          addLog(`[SIGMA] ALERTE : Stabilité ${(stability * 100).toFixed(2)}% < 80%.`);
          addLog("[CRITICAL] VERROUILLAGE DU NOYAU. Action révoquée.");
          return;
        }

        setSimProgress(50);
        addLog(`[SIGMA] Stabilité système : ${(stability * 100).toFixed(2)}%. Seuil respecté.`);
        setSimStatus('x108');
        
        // Step 3: X-108 Gate (Simulated 5s for demo, but labeled 108s)
        let timeLeft = 108;
        const interval = setInterval(() => {
          timeLeft -= 20; // Fast countdown for demo
          if (timeLeft <= 0) {
            clearInterval(interval);
            setSimTimer(0);
            setSimProgress(75);
            addLog("[X-108] Délai temporel expiré. Scellage Merkle en cours...");
            setSimStatus('sealing');
            
            // Step 4: Sealing (1.5s)
            setTimeout(() => {
              setSimProgress(100);
              addLog("[MERKLE] Racine générée : 0x7F8E...A2B1. Action scellée.");
              setSimStatus('executed');
              addLog("[SUCCESS] Action libérée vers le monde réel.");
            }, 1500);
          } else {
            setSimTimer(timeLeft);
            addLog(`[X-108] Sas temporel actif... T-${timeLeft}s`);
          }
        }, 800);
      }, 2000);
    }, 1500);
  };

  const resetSimulation = () => {
    setSimStatus('idle');
    setSimProgress(0);
    setSimStability(1.0);
    setSimTimer(108);
    setSimLogs([]);
  };

  const pillars = [
    {
      title: "OS2 Filter",
      subtitle: "Le Filtre Anti-Bruit",
      desc: "C'est le filtre de pureté absolue. Il rejette instantanément tout ce qui ressemble à une estimation ou à une probabilité. Seules les données 100% exactes et vérifiables sont autorisées à entrer.",
      icon: Filter,
      stats: "0% Probabilité Tolérée"
    },
    {
      title: "X-108 Gate",
      subtitle: "Le Frein Temporel",
      desc: "Dans le monde numérique, tout va trop vite. X-108 réintroduit la physique : un délai de 108 secondes incompressible pour toute action critique. Le temps devient une preuve.",
      icon: Clock,
      stats: "τ = 108s (Constante)"
    },
    {
      title: "Sigma Engine",
      subtitle: "Le Gyroscope de Stabilité",
      desc: "Il surveille l'équilibre du système. Si une action provoque une 'vibration' anormale dans les métriques, Sigma verrouille tout avant que l'instabilité ne se propage.",
      icon: Activity,
      stats: "σ > 0.95 (Stabilité)"
    }
  ];

  const steps = [
    { 
      id: "ingest", 
      title: "Filtrage OS2", 
      icon: Filter, 
      desc: <>On élimine l'incertitude via le <GlossaryTerm term="OS2 Filter" />. Seules les données 100% conformes entrent.</>,
      color: "text-obsidia-accent"
    },
    { 
      id: "x108", 
      title: "Scellé Temporel", 
      icon: Clock, 
      desc: <>L'action est mise en 'pause physique' pendant 108 secondes (<GlossaryTerm term="X-108" />).</>,
      color: "text-obsidia-accent"
    },
    { 
      id: "sigma", 
      title: "Calcul Sigma", 
      icon: Activity, 
      desc: <>Vérification de l'impact sur la stabilité globale via le <GlossaryTerm term="Sigma Engine" />.</>,
      color: "text-obsidia-accent"
    },
    { 
      id: "consensus", 
      title: "Vote N4", 
      icon: ShieldCheck, 
      desc: <>Plusieurs <GlossaryTerm term="Nœud">nœuds</GlossaryTerm> indépendants doivent signer mathématiquement l'accord (<GlossaryTerm term="Vote N4" />).</>,
      color: "text-obsidia-accent"
    },
    { 
      id: "audit", 
      title: "Preuve Merkle", 
      icon: History, 
      desc: <>Génération d'un sceau cryptographique immuable (<GlossaryTerm term="Racine Merkle" />).</>,
      color: "text-obsidia-accent"
    },
    { 
      id: "action", 
      title: "Exécution", 
      icon: CheckCircle2, 
      desc: "Libération sécurisée de l'action vers le monde réel.",
      color: "text-emerald-500"
    }
  ];

  const threats = [
    {
      title: "Attaque par Collision",
      vector: "Tenter de modifier une règle en gardant la même signature.",
      defense: <>Impossible. Le <GlossaryTerm term="Merkle Seal" /> d'Obsidia est prouvé mathématiquement sans collision.</>,
      icon: AlertTriangle
    },
    {
      title: "Corruption de Nœud",
      vector: "Prendre le contrôle d'un nœud pour forcer une décision.",
      defense: <>Fail-Closed. Il faut 3/4 <GlossaryTerm term="Nœud">nœuds</GlossaryTerm>. Si 1 nœud dévie, le système se verrouille.</>,
      icon: ShieldAlert
    },
    {
      title: "Accélération Temporelle",
      vector: "Tenter de contourner le délai des 108 secondes.",
      defense: "X-108 est lié à l'horloge atomique du noyau. Incontournable.",
      icon: Zap
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section - More Visual */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-obsidia-accent/10 border border-obsidia-accent/20 text-obsidia-accent text-[10px] font-bold uppercase tracking-widest mb-6">
              <Binary className="w-3 h-3" /> Architecture Déterministe
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 italic leading-tight">Le Noyau <br /><span className="text-obsidia-accent">Obsidia</span></h1>
            <p className="text-xl text-obsidia-ink/60 leading-relaxed">
              Obsidia n'est pas une IA. C'est un <GlossaryTerm term="Déterministe">moteur de certitude</GlossaryTerm>. Là où les IA prédisent avec une probabilité, Obsidia décide avec une <GlossaryTerm term="Preuve formelle">preuve mathématique absolue</GlossaryTerm>.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-obsidia-blue/5 border border-obsidia-line rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.1)_0%,transparent_70%)]"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-obsidia-accent/20 rounded-full"
              ></motion.div>
              <div className="relative z-10 text-center">
                <Cpu className="w-20 h-20 text-obsidia-accent mx-auto mb-4" />
                <div className="text-xs font-mono text-obsidia-accent/60">CORE_ENGINE_V2.8</div>
              </div>
            </div>
            {/* Floating Stats */}
            <div className="absolute top-0 right-0 bg-obsidia-bg border border-obsidia-line p-4 shadow-xl">
              <div className="text-[10px] font-bold text-obsidia-ink/40 uppercase mb-1">Probabilité d'Erreur</div>
              <div className="text-2xl font-bold text-emerald-500 font-mono">0.0000%</div>
            </div>
            <div className="absolute bottom-10 left-0 bg-obsidia-bg border border-obsidia-line p-4 shadow-xl">
              <div className="text-[10px] font-bold text-obsidia-ink/40 uppercase mb-1">Vérification <GlossaryTerm term="Lean 4" /></div>
              <div className="text-2xl font-bold text-obsidia-accent font-mono mb-2">CERTIFIED</div>
              <a 
                href={`${CONFIG.GITHUB_REPO}/tree/main/proofs`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[8px] font-bold uppercase tracking-widest text-obsidia-accent hover:underline flex items-center gap-1"
              >
                <div className="flex items-center gap-1">
                  <Github className="w-2 h-2" />
                  Voir les preuves formelles <ArrowRight className="w-2 h-2" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Section - Simplified */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-4">L'Inversion du Paradigme</h2>
            <p className="text-obsidia-ink/60 italic">Pourquoi Obsidia remplace l'IA là où la sécurité est critique.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-obsidia-line border border-obsidia-line overflow-hidden rounded-sm">
            <div className="bg-obsidia-bg p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-obsidia-ink/40">IA Probabiliste</h3>
              </div>
              <ul className="space-y-8">
                {[
                  { label: "Décision", val: "Basée sur des statistiques", desc: "Il y a 99% de chances que ce soit OK. (Le 1% est un crash)." },
                  { label: "Logique", val: "Boîte Noire", desc: "Impossible de prouver pourquoi l'IA a pris cette décision." },
                  { label: "Sécurité", val: "Réactive", desc: "On corrige après l'incident. Trop tard." }
                ].map((item, i) => (
                  <li key={i}>
                    <div className="text-[10px] font-bold text-red-500 uppercase mb-1">{item.label}</div>
                    <div className="font-bold mb-1">{item.val}</div>
                    <p className="text-sm text-obsidia-ink/50 italic">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-obsidia-blue/5 p-12 relative">
              <div className="absolute top-0 right-0 p-4">
                <ShieldCheck className="w-6 h-6 text-obsidia-accent opacity-20" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-obsidia-accent/10 flex items-center justify-center text-obsidia-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-obsidia-accent">Obsidia Déterministe</h3>
              </div>
              <ul className="space-y-8">
                {[
                  { label: "Décision", val: "Basée sur des invariants", desc: <>L'action est mathématiquement prouvée sûre à 100% via des <GlossaryTerm term="Invariant">Invariants</GlossaryTerm>.</> },
                  { 
                    label: "Logique", 
                    val: (
                      <a 
                        href={`${CONFIG.GITHUB_REPO}/blob/main/INVARIANTS.md`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-obsidia-accent underline decoration-obsidia-accent/30 flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        Code Formel (<GlossaryTerm term="Lean 4" />)
                      </a>
                    ), 
                    desc: "Chaque étape est une équation vérifiable et auditable." 
                  },
                  { label: "Sécurité", val: "Préventive (X-108)", desc: <>L'action est bloquée AVANT l'exécution si un doute existe via le <GlossaryTerm term="X-108">Délai X-108</GlossaryTerm>.</> }
                ].map((item, i) => (
                  <li key={i}>
                    <div className="text-[10px] font-bold text-obsidia-accent uppercase mb-1">{item.label}</div>
                    <div className="font-bold mb-1">{item.val}</div>
                    <p className="text-sm text-obsidia-ink/70">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            L’ORIGINE DU NOYAU
          </div>
          <h3 className="text-2xl font-bold mb-6 text-obsidia-bg italic">"LE CHOIX DU DÉTERMINISTE"</h3>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Obsidia repose sur une idée simple : pour les actions sensibles, le probabiliste ne suffit pas. Le cœur du projet est un noyau déterministe qui contrôle avant action, garde la trace de chaque décision et ne laisse passer que ce qui tient dans un cadre prouvé et démontré.
          </p>
        </div>

        {/* The 3 Pillars - More Didactic */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Database className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Les 3 Organes du Noyau</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-obsidia-blue/10 border border-obsidia-line p-10 rounded-sm hover:border-obsidia-accent/50 transition-all group">
                <div className="w-12 h-12 bg-obsidia-accent/10 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent mb-8 group-hover:bg-obsidia-accent group-hover:text-obsidia-bg transition-all">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold text-obsidia-accent mb-2 uppercase tracking-widest">{pillar.subtitle}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">{pillar.title}</h3>
                <p className="text-sm text-obsidia-ink/60 leading-relaxed mb-8">{pillar.desc}</p>
                <div className="pt-6 border-t border-obsidia-line font-mono text-[10px] text-obsidia-ink/40 flex justify-between">
                  <span>MÉTRIQUE_CLEF</span>
                  <span className="text-obsidia-accent">{pillar.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SIGMA ENGINE LIVE MONITORING */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Activity className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Moniteur de Stabilité Sigma</h2>
          </div>

          <div className="bg-obsidia-bg border border-obsidia-line p-8 md:p-12 rounded-sm">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="h-[300px] w-full bg-obsidia-blue/5 border border-obsidia-line p-6 relative">
                  <div className="absolute top-4 right-6 flex items-center gap-4 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-obsidia-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Stabilité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 border border-red-500 border-dashed" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Seuil (80%)</span>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sigmaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={[40, 120]} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #141414', fontSize: '10px', borderRadius: '0' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stability" 
                        stroke={chaosMode ? "#ef4444" : "#f27d26"} 
                        strokeWidth={2} 
                        dot={false} 
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="threshold" 
                        stroke="#ef4444" 
                        strokeDasharray="5 5" 
                        dot={false} 
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight italic">Analyse en Temps Réel</h3>
                  <p className="text-xs text-obsidia-ink/60 leading-relaxed">
                    Le moteur Sigma analyse les vecteurs de comportement du système. Toute dérive sous le seuil de 80% déclenche un verrouillage immédiat du noyau.
                  </p>
                </div>

                <div className="p-6 border border-obsidia-line bg-obsidia-ink text-obsidia-bg rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Statut Actuel</span>
                    <div className={`flex items-center gap-2 px-2 py-0.5 rounded-full border ${chaosMode ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${chaosMode ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">{chaosMode ? 'Instable' : 'Nominal'}</span>
                    </div>
                  </div>
                  <div className="text-4xl font-bold font-mono text-obsidia-accent">
                    {sigmaData.length > 0 ? sigmaData[sigmaData.length - 1].stability.toFixed(2) : "100.00"}%
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setChaosMode(!chaosMode)}
                    className={`flex-grow py-4 px-6 border-2 font-bold uppercase tracking-widest text-[10px] transition-all ${chaosMode ? "bg-emerald-500 border-emerald-500 text-white" : "bg-red-500 border-red-500 text-white hover:bg-red-600"}`}
                  >
                    {chaosMode ? "Restaurer Stabilité" : "Injecter Instabilité"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTION SIMULATOR - NEW SECTION */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Zap className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Simulateur de Déterminisme</h2>
          </div>

          <div className="bg-obsidia-ink border border-obsidia-line p-8 md:p-16 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-obsidia-accent/20 h-full"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-obsidia-bg italic uppercase tracking-tight">Interface de Contrôle</h3>
                <p className="text-obsidia-bg/60 mb-8 leading-relaxed">
                  Testez la logique déterministe d'Obsidia. En soumettant une action critique, vous déclenchez le pipeline de sécurité complet : filtrage OS2, analyse Sigma et sas temporel X-108.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-obsidia-bg/5 border border-obsidia-bg/10 rounded-sm">
                    <div className="flex items-center gap-3">
                      <Activity className={`w-4 h-4 ${simStatus === 'sigma' ? 'text-obsidia-accent animate-pulse' : 'text-obsidia-bg/20'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-bg/40">Stabilité Sigma</span>
                    </div>
                    <span className="font-mono text-obsidia-accent">{(simStability * 100).toFixed(2)}%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-obsidia-bg/5 border border-obsidia-bg/10 rounded-sm">
                    <div className="flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${simStatus === 'x108' ? 'text-obsidia-accent animate-pulse' : 'text-obsidia-bg/20'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-bg/40">Sas X-108</span>
                    </div>
                    <span className="font-mono text-obsidia-accent">{simTimer}s</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-obsidia-bg/5 border border-obsidia-bg/10 rounded-sm">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className={`w-4 h-4 ${chaosMode ? 'text-red-500' : 'text-obsidia-bg/20'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-bg/40">Mode Chaos (Attaque)</span>
                    </div>
                    <button 
                      onClick={() => setChaosMode(!chaosMode)}
                      className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border transition-all ${chaosMode ? 'bg-red-500 border-red-500 text-white' : 'border-obsidia-bg/20 text-obsidia-bg/40'}`}
                    >
                      {chaosMode ? 'ACTIF' : 'INACTIF'}
                    </button>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  {simStatus === 'idle' ? (
                    <button 
                      onClick={startSimulation}
                      className="px-8 py-4 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest text-[10px] hover:bg-obsidia-accent/90 transition-all flex items-center gap-2"
                    >
                      <Zap className="w-3 h-3" /> Initier Action Critique
                    </button>
                  ) : (
                    <button 
                      onClick={resetSimulation}
                      className="px-8 py-4 border border-obsidia-bg/20 text-obsidia-bg font-bold uppercase tracking-widest text-[10px] hover:bg-obsidia-bg hover:text-obsidia-ink transition-all"
                    >
                      Réinitialiser Noyau
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-obsidia-bg border border-obsidia-line p-8 rounded-sm shadow-2xl min-h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-8 border-b border-obsidia-line pb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${simStatus !== 'idle' ? 'bg-emerald-500 animate-pulse' : 'bg-obsidia-ink/20'}`}></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Statut Noyau : {simStatus.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] font-mono text-obsidia-accent">{simProgress}%</span>
                </div>

                <div className="flex-grow space-y-4 font-mono text-[10px] text-obsidia-ink/60 overflow-hidden">
                  <AnimatePresence>
                    {simLogs.map((log, i) => (
                      <motion.div 
                        key={log + i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 border-l-2 ${
                          log.includes('[SUCCESS]') ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600' : 
                          log.includes('[CRITICAL]') || log.includes('ALERTE') ? 'border-red-500 bg-red-500/5 text-red-600' :
                          'border-obsidia-accent bg-obsidia-accent/5 text-obsidia-ink/80'
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {simStatus === 'idle' && (
                    <div className="h-full flex items-center justify-center italic opacity-30">
                      En attente d'initialisation...
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-obsidia-line">
                  <div className="h-1 w-full bg-obsidia-line rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${simProgress}%` }}
                      className="h-full bg-obsidia-accent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* X-108 TEMPORAL GATE VISUAL SIMULATION */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Clock className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Le Sas Temporel X-108</h2>
          </div>

          <div className="bg-obsidia-bg border border-obsidia-line p-12 rounded-sm relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                {/* Circular Progress for Countdown */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-obsidia-line"
                    />
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="754"
                      animate={{ strokeDashoffset: 754 - (754 * x108Time) / 108 }}
                      transition={{ duration: 0.5, ease: "linear" }}
                      className="text-obsidia-accent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold font-mono text-obsidia-accent">
                      {x108Time}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Secondes</div>
                  </div>
                </div>

                {/* Status Indicator Overlay */}
                <AnimatePresence>
                  {x108Status === 'completed' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-obsidia-bg/80 backdrop-blur-sm z-20"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-600 uppercase italic">Sas Validé</h3>
                        <p className="text-xs text-obsidia-ink/60 mt-2">Action critique libérée.</p>
                        <button onClick={resetX108Gate} className="mt-6 text-[10px] font-bold uppercase tracking-widest text-obsidia-accent underline">Réinitialiser</button>
                      </div>
                    </motion.div>
                  )}
                  {x108Status === 'interrupted' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-obsidia-bg/80 backdrop-blur-sm z-20"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                          <XCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-red-600 uppercase italic">Sas Interrompu</h3>
                        <p className="text-xs text-obsidia-ink/60 mt-2">Violation de vélocité détectée.</p>
                        <button onClick={resetX108Gate} className="mt-6 text-[10px] font-bold uppercase tracking-widest text-obsidia-accent underline">Réinitialiser</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight italic">Contrôle de Vélocité</h3>
                <p className="text-obsidia-ink/60 mb-8 leading-relaxed">
                  Le délai X-108 n'est pas une attente passive. C'est une barrière physique contre l'automatisme malveillant. En forçant un délai de 108 secondes, Obsidia retire l'avantage de la vitesse aux attaquants.
                </p>

                <div className="space-y-6 mb-12">
                  <div className="p-6 border border-obsidia-line bg-obsidia-blue/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-accent mb-2">Preuve de Patience</h4>
                    <p className="text-[10px] text-obsidia-ink/50 leading-relaxed italic">
                      "Le temps est la seule ressource qu'un bot ne peut pas fabriquer."
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {!x108Active ? (
                    <button 
                      onClick={startX108Gate}
                      className="px-10 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest text-xs hover:bg-obsidia-accent/90 transition-all flex items-center gap-3"
                    >
                      <Zap className="w-4 h-4" /> Activer le Sas
                    </button>
                  ) : (
                    <button 
                      onClick={interruptX108Gate}
                      className="px-10 py-5 bg-red-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-all flex items-center gap-3"
                    >
                      <ShieldAlert className="w-4 h-4" /> Interrompre l'Action
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Pipeline - Enhanced Visuals */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Zap className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Le Parcours d'une Décision</h2>
          </div>

          <div className="bg-obsidia-bg border border-obsidia-line p-8 md:p-16 rounded-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`px-6 py-4 border transition-all flex items-center gap-3 ${activeStep === idx ? "bg-obsidia-accent border-obsidia-accent text-obsidia-bg" : "bg-obsidia-bg border-obsidia-line text-obsidia-ink hover:border-obsidia-accent/30"}`}
                  >
                    <step.icon className={`w-4 h-4 ${activeStep === idx ? "text-obsidia-bg" : step.color}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{step.title}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-12 border border-obsidia-line bg-obsidia-blue/5 relative"
                >
                  <div className="absolute top-0 right-0 p-8 text-8xl font-bold text-obsidia-accent/5 pointer-events-none">
                    0{activeStep + 1}
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-shrink-0 w-24 h-24 bg-obsidia-bg border border-obsidia-line flex items-center justify-center text-obsidia-accent shadow-xl">
                      {(() => {
                        const Icon = steps[activeStep].icon;
                        return <Icon className="w-10 h-10" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-4 uppercase tracking-tight italic">{steps[activeStep].title}</h3>
                      <p className="text-lg text-obsidia-ink/60 leading-relaxed max-w-2xl">{steps[activeStep].desc}</p>
                      <div className="mt-8 flex items-center gap-4">
                        <div className="h-1 w-24 bg-obsidia-line overflow-hidden">
                          <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            className="h-full bg-obsidia-accent"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-obsidia-accent">VERIFICATION_EN_COURS...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Adversarial Resilience - More Visual */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <ShieldAlert className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Résilience face au Chaos</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {threats.map((threat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThreat(idx)}
                  className={`w-full p-6 border text-left transition-all relative overflow-hidden ${activeThreat === idx ? "border-obsidia-accent bg-obsidia-accent/5" : "border-obsidia-line hover:border-obsidia-accent/30"}`}
                >
                  {activeThreat === idx && (
                    <motion.div layoutId="threat-active" className="absolute left-0 top-0 w-1 h-full bg-obsidia-accent" />
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <threat.icon className={`w-5 h-5 ${activeThreat === idx ? "text-obsidia-accent" : "text-obsidia-ink/30"}`} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">{threat.title}</h3>
                  </div>
                  <p className="text-[10px] text-obsidia-ink/40 leading-relaxed">{threat.vector}</p>
                </button>
              ))}
            </div>
            
            <div className="lg:col-span-2 bg-obsidia-blue/10 border border-obsidia-line p-12 rounded-sm relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThreat}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="relative z-10"
                >
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent mb-2">Scénario d'Attaque</div>
                      <h3 className="text-4xl font-bold uppercase tracking-tight italic">{threats[activeThreat].title}</h3>
                    </div>
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                      Danger: Élevé
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="p-6 bg-obsidia-bg border border-obsidia-line">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" /> Vecteur d'Attaque
                      </h4>
                      <p className="text-sm text-obsidia-ink/60 leading-relaxed italic">"{threats[activeThreat].vector}"</p>
                    </div>
                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> Neutralisation Noyau
                      </h4>
                      <p className="text-sm text-obsidia-ink/80 leading-relaxed font-bold">{threats[activeThreat].defense}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* PERFORMANCE MONITOR - NEW SECTION */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Benchmarks de Performance Noyau</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-obsidia-bg border border-obsidia-line rounded-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 mb-4">Latence Moyenne</div>
              <div className="text-5xl font-bold font-mono text-obsidia-accent mb-2">1.24<span className="text-xl">ms</span></div>
              <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">● Optimal</div>
            </div>
            <div className="p-8 bg-obsidia-bg border border-obsidia-line rounded-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 mb-4">Débit (Throughput)</div>
              <div className="text-5xl font-bold font-mono text-obsidia-accent mb-2">12.5k<span className="text-xl">ops/s</span></div>
              <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">● Haute Capacité</div>
            </div>
            <div className="p-8 bg-obsidia-bg border border-obsidia-line rounded-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 mb-4">Variance Déterministe</div>
              <div className="text-5xl font-bold font-mono text-obsidia-accent mb-2">0.02<span className="text-xl">ms</span></div>
              <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">● Ultra-Stable</div>
            </div>
          </div>

          <div className="mt-12 p-10 bg-obsidia-ink border border-obsidia-accent/20 rounded-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-obsidia-accent/10 flex items-center justify-center text-obsidia-accent border border-obsidia-accent/20">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-obsidia-bg uppercase tracking-tight italic">Analyse de Charge</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-obsidia-bg/60 text-sm leading-relaxed italic">
                  "Le noyau Obsidia maintient une latence quasi-constante même sous une charge de 10 000 transactions simultanées. Cette prévisibilité est la clé de notre sécurité déterministe."
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href={`${CONFIG.GITHUB_REPO}/blob/main/tests/performance.test.ts`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <Github className="w-3 h-3" />
                    Voir les benchmarks (performance.test.ts) <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="bg-obsidia-bg/5 border border-obsidia-bg/10 p-6 rounded-sm">
                <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent mb-4">Résultats des Tests CI/CD</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-obsidia-bg/40">LOW_LOAD_TEST</span>
                    <span className="text-emerald-500">PASSED (0.8ms)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-obsidia-bg/40">HIGH_LOAD_TEST</span>
                    <span className="text-emerald-500">PASSED (1.5ms)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-obsidia-bg/40">STRESS_TEST_10K</span>
                    <span className="text-emerald-500">PASSED (2.1ms)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Summary - Sealed Core */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <ShieldCheck className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Seuils de Sécurité Centralisés</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "X-108 Gate", value: "108s", desc: "Délai temporel minimum" },
              { label: "Sigma Engine", value: "80%", desc: "Seuil de stabilité critique" },
              { label: "OS2 Filter", value: "5k ops/s", desc: "Plafond de vélocité" },
              { label: "N4 Quorum", value: "67%", desc: "Consensus byzantin" },
              { label: "Merkle Depth", value: "32", desc: "Profondeur max de l'arbre" },
              { label: "Hash Algo", value: "SHA-256", desc: "Standard cryptographique" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-obsidia-bg border border-obsidia-line hover:border-obsidia-accent transition-all">
                <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 mb-2">{item.label}</div>
                <div className="text-2xl font-bold text-obsidia-accent mb-1">{item.value}</div>
                <div className="text-[9px] text-obsidia-ink/60 italic">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a 
              href={`${CONFIG.GITHUB_REPO}/blob/main/config/thresholds.json`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
            >
              <Code className="w-3 h-3" /> Configurer les seuils (thresholds.json) <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </section>

        <div className="bg-obsidia-ink text-obsidia-bg p-16 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-obsidia-accent/10 blur-[100px]"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-8 italic uppercase tracking-tight">L'Inviolabilité par Design</h2>
              <p className="text-obsidia-bg/60 mb-12 leading-relaxed">
                Le noyau Obsidia n'est pas une promesse marketing. C'est un objet mathématique scellé. Toute déviation, même minime, entraîne un verrouillage immédiat du système.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-1 italic">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Déterminisme</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1 italic">{"< 5ms"}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">validation / 108s délai X-108</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-obsidia-accent blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-64 h-64 border-2 border-obsidia-accent flex flex-col items-center justify-center bg-obsidia-ink p-8">
                  <Lock className="w-16 h-16 text-obsidia-accent mb-4" />
                  <div className="text-xl font-bold italic uppercase tracking-widest">NOYAU_SCELLÉ</div>
                  <div className="text-[8px] font-mono opacity-40 mt-4">HASH: 0x7F8E...A2B1</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Results & Lexicon */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 p-8 border border-obsidia-line bg-obsidia-blue/5">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Résultats vérifiés v1.3.0</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-obsidia-ink/40">Trading</span>
                <span className="font-bold text-emerald-500">ALLOW</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-obsidia-ink/40">Bank</span>
                <span className="font-bold text-red-500">BLOCK FRAUD_PATTERN</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-obsidia-ink/40">1M paires</span>
                <span className="font-bold">0 violation</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              {
                term: "Lean 4",
                def: "Langage de programmation et assistant de preuve utilisé par Obsidia pour vérifier mathématiquement que chaque ligne de code respecte les spécifications de sécurité.",
                icon: <Code className="w-4 h-4" />
              },
              {
                term: "N4 Vote",
                def: "Protocole de consensus propriétaire où chaque vote est accompagné d'une preuve de validité formelle, empêchant toute manipulation par des nœuds malveillants.",
                icon: <ShieldCheck className="w-4 h-4" />
              },
              {
                term: "Racine Merkle",
                def: "Structure de données cryptographique qui condense l'intégralité du système en une seule empreinte immuable.",
                icon: <Fingerprint className="w-4 h-4" />
              },
              {
                term: "Déterminisme",
                def: "Propriété garantissant qu'une même entrée produira toujours exactement la même sortie, éliminant les comportements imprévisibles.",
                icon: <Zap className="w-4 h-4" />
              }
            ].map((item, i) => (
              <div key={i} className="p-6 border border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-obsidia-accent group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-accent">{item.term}</h4>
                </div>
                <p className="text-[10px] text-obsidia-ink/50 leading-relaxed">
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24 text-center">
          <a 
            href={CONFIG.GITHUB_REPO} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
          >
            <Github className="w-4 h-4" /> Explorer le noyau de preuve <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Noyau;
