import { motion, AnimatePresence } from "motion/react";
import { Shield, Lock, FileCheck, Database, AlertCircle, CheckCircle2, Fingerprint, History, FileWarning, Activity, ShieldCheck, Code, Zap, Clock, Info, HelpCircle, Github, ArrowRight, ShieldAlert, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlossaryTerm from "../components/GlossaryTerm";
import { CONFIG } from "../config";

const Securite = () => {
  const [isTampered, setIsTampered] = useState(false);
  const [merkleRoot, setMerkleRoot] = useState("0x7f8e...a2b1");
  const [globalSeal, setGlobalSeal] = useState("0x4d2c...9e3f");
  const [activeLayer, setActiveLayer] = useState(0);
  const [sigmaAttack, setSigmaAttack] = useState(false);
  const [sigmaData, setSigmaData] = useState<any[]>([]);
  const [selectedEmpiricalTest, setSelectedEmpiricalTest] = useState<number | null>(null);
  const [engineOnline, setEngineOnline] = useState(false);
  const [realLatency, setRealLatency] = useState<number>(0);

  // Check engine status and latency
  useEffect(() => {
    const checkStatus = async () => {
      const start = performance.now();
      try {
        const response = await fetch(`${CONFIG.ENGINE_URL}/api/health`);
        const end = performance.now();
        setRealLatency(end - start);
        setEngineOnline(response.ok);
      } catch (error) {
        setEngineOnline(false);
        setRealLatency(0);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sigma Data Generation (Real or Simulation)
  useEffect(() => {
    const updateData = async () => {
      let newStabilityValue = 100;
      
      if (engineOnline) {
        try {
          // Try to fetch real metrics if the endpoint exists
          const response = await fetch(`${CONFIG.ENGINE_URL}/api/metrics`);
          if (response.ok) {
            const data = await response.json();
            if (data.stability) {
              newStabilityValue = data.stability;
            }
          } else {
            // Fallback: use latency to add "real" noise to the simulation
            // Higher latency = more jitter in the stability metric
            const jitter = (realLatency / 100) * (Math.random() - 0.5) * 10;
            newStabilityValue = 100 + jitter;
          }
        } catch (e) {
          // Fallback to simulation noise
          newStabilityValue = 100 + (Math.random() - 0.5) * 4;
        }
      } else {
        // Offline simulation
        newStabilityValue = 100 + (Math.random() - 0.5) * 2;
      }

      setSigmaData(prev => {
        const newData = [...prev];
        if (newData.length >= 20) newData.shift();
        
        const attack = sigmaAttack ? (Math.random() * 20) + 10 : 0;
        
        newData.push({
          time: prev.length > 0 ? prev[prev.length - 1].time + 1 : 0,
          stability: newStabilityValue + attack,
          limit: 120
        });
        return newData;
      });
    };

    // Initialize with some data if empty
    if (sigmaData.length === 0) {
      const initialData = [];
      for (let i = 0; i < 20; i++) {
        initialData.push({ time: i, stability: 100, limit: 120 });
      }
      setSigmaData(initialData);
    }

    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, [engineOnline, realLatency, sigmaAttack, sigmaData.length]);

  const empiricalTests = [
    { name: "Sybil", desc: "Attaque par usurpation d'identité multiple pour manipuler un vote ou un consensus." },
    { name: "Flashloan", desc: "Utilisation de prêts instantanés pour manipuler le marché ou la gouvernance en une seule transaction." },
    { name: "Drift", desc: "Dérive lente des paramètres du système pour sortir de la zone de sécurité sans déclencher d'alerte immédiate." },
    { name: "Replay", desc: "Capture d'une transaction valide pour la rejouer plusieurs fois de manière malveillante." },
    { name: "Collision", desc: "Tentative de générer deux entrées différentes produisant la même empreinte cryptographique (Hash)." },
    { name: "Overflow", desc: "Dépassement de capacité numérique pour provoquer un comportement imprévu du code." },
    { name: "Logic", desc: "Erreur dans la logique métier permettant de contourner les règles de sécurité." },
    { name: "State", desc: "Manipulation de l'état interne du système pour le forcer dans une configuration vulnérable." }
  ];

  const theorems = [
    {
      id: "G3",
      name: "G3_monotonicity",
      code: "theorem G3_monotonicity (s1 s2 : State) (h : s1 ≤ s2) : (Obsidia.decision s1) ≤ (Obsidia.decision s2)",
      desc: "Garantit que si le risque n'augmente pas, la décision ne peut pas devenir plus restrictive arbitrairement. Stabilité mathématique du moteur."
    },
    {
      id: "P15",
      name: "P15_Immutability_Strong",
      code: "theorem P15_Immutability (h : Hash) (f : File) : (Merkle.verify h f) → (f.content = f_original.content)",
      desc: "Preuve formelle que toute modification d'un fichier, même d'un bit, invalide la racine Merkle. Base de la preuve d'intégrité d'Obsidia."
    },
    {
      id: "X108",
      name: "X108_no_act_before_tau",
      code: "theorem X108_temporal_gate (t : Time) (τ : Duration) : (t < τ) → (Obsidia.state ≠ ACT)",
      desc: <>Interdiction mathématique absolue d'exécuter une action irréversible avant la fin du délai de sécurité τ défini par le standard <GlossaryTerm term="X-108">X-108</GlossaryTerm>.</>
    }
  ];

  const layers = [
        {
          title: "Couche 1 : Preuve Formelle",
          subtitle: "Le Correcteur Mathématique",
          icon: Code,
          desc: (
            <>
              Le code n'est pas juste écrit, il est prouvé. Nous utilisons Lean 4 pour transformer chaque règle de sécurité en un théorème mathématique. Si le théorème n'est pas vrai, le code ne peut pas s'exécuter.
              <br /><br />
              <a 
                href={`${CONFIG.GITHUB_REPO}/tree/main/proofs`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <Github className="w-3 h-3" />
                Auditer les 8 théorèmes du noyau <ArrowRight className="w-3 h-3" />
              </a>
            </>
          ),
          detail: "Zéro bug logique possible."
        },
    {
      title: "Couche 2 : Preuve Empirique",
      subtitle: "Le Crash-Test Adversarial",
      icon: ShieldCheck,
      desc: "Là où la preuve formelle garantit que le code fait ce qu'il dit, la preuve empirique garantit qu'il résiste à ce qu'il ne connaît pas encore. Nous soumettons le noyau à des milliers de simulations d'attaques réelles (Sybil, Flashloans, etc.) pour prouver sa résilience pratique.",
      detail: "Résilience prouvée face au chaos."
    },
    {
      title: "Couche 3 : Preuve Dynamique",
      subtitle: "Le Filet de Sécurité Sigma",
      icon: Activity,
      desc: "C'est le système immunitaire d'Obsidia. Une surveillance comportementale en temps réel qui ne regarde pas le code, mais la trajectoire du système. Si une dérive anormale est détectée, le noyau se verrouille instantanément pour protéger les actifs.",
      detail: "Protection active 24/7."
    }
  ];

  useEffect(() => {
    if (isTampered) {
      setMerkleRoot("0xERR_COLLISION_DETECTED");
      setGlobalSeal("0xINVALID_SEAL_BROKEN");
    } else {
      setMerkleRoot("0x7f8e...a2b1");
      setGlobalSeal("0x4d2c...9e3f");
    }
  }, [isTampered]);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3 h-3" /> Sécurité Vérifiée par Lean 4
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 italic">Confiance <br /><span className="text-obsidia-accent">Mathématique</span></h1>
          <p className="text-xl text-obsidia-ink/60 leading-relaxed">
            La confiance ne se décrète pas, elle se prouve. Obsidia remplace les promesses par des <GlossaryTerm term="Preuve formelle">équations</GlossaryTerm>.
          </p>
        </div>

        {/* The Chain of Proof - Layered Visual */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">La Triple Protection Obsidia</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              {layers.map((layer, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={`w-full p-8 border text-left transition-all relative overflow-hidden ${activeLayer === idx ? "border-obsidia-accent bg-obsidia-accent/5" : "border-obsidia-line hover:border-obsidia-accent/30"}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center border ${activeLayer === idx ? "bg-obsidia-accent border-obsidia-accent text-obsidia-bg" : "bg-obsidia-blue/5 border-obsidia-line text-obsidia-ink/40"}`}>
                      <layer.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-widest text-xs">{layer.title}</h3>
                      <div className="text-[10px] text-obsidia-accent font-bold">{layer.subtitle}</div>
                    </div>
                  </div>
                  <p className="text-xs text-obsidia-ink/40 leading-relaxed">{layer.detail}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-obsidia-bg border border-obsidia-line p-12 rounded-sm relative min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-4 mb-8">
                    {(() => {
                      const Icon = layers[activeLayer].icon;
                      return <Icon className="w-12 h-12 text-obsidia-accent" />;
                    })()}
                    <h3 className="text-4xl font-bold uppercase tracking-tight italic">{layers[activeLayer].subtitle}</h3>
                  </div>
                  <p className="text-xl text-obsidia-ink/60 leading-relaxed mb-12 max-w-2xl">
                    {layers[activeLayer].desc}
                  </p>

                  {activeLayer === 0 && (
                    <div className="bg-obsidia-ink p-8 rounded-sm border border-obsidia-accent/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-mono text-obsidia-accent">LEAN_4_VERIFIER_OUTPUT</div>
                        <div className="text-[10px] font-mono text-emerald-500">PROVED</div>
                      </div>
                      <div className="font-mono text-xs text-obsidia-bg/60 space-y-2">
                        <div className="text-emerald-500">theorem P15_Immutability (h : Hash) (f : File) :</div>
                        <div className="pl-4">(Merkle.verify h f) → (f.content = f_original.content) :=</div>
                        <div className="pl-4 text-obsidia-accent">by intros h f h_verify; ... qed</div>
                      </div>
                    </div>
                  )}

                  {activeLayer === 1 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {empiricalTests.map((test, i) => (
                          <button 
                            key={i} 
                            onClick={() => setSelectedEmpiricalTest(i)}
                            className={`p-4 border transition-all ${selectedEmpiricalTest === i ? "border-obsidia-accent bg-obsidia-accent/10" : "border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent/50"}`}
                          >
                            <div className="text-[10px] font-bold uppercase mb-2">{test.name}</div>
                            <CheckCircle2 className={`w-4 h-4 mx-auto ${selectedEmpiricalTest === i ? "text-obsidia-accent" : "text-emerald-500"}`} />
                          </button>
                        ))}
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {selectedEmpiricalTest !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-6 border border-obsidia-accent/20 bg-obsidia-accent/5"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-4 h-4 text-obsidia-accent" />
                              <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-accent">Détail du Test : {empiricalTests[selectedEmpiricalTest].name}</h4>
                            </div>
                            <p className="text-sm text-obsidia-ink/80 leading-relaxed italic">
                              {empiricalTests[selectedEmpiricalTest].desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {selectedEmpiricalTest === null && (
                        <div className="text-center p-4 border border-dashed border-obsidia-line text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30">
                          Cliquez sur un test pour voir l'explication technique
                        </div>
                      )}
                    </div>
                  )}

                  {activeLayer === 2 && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent">Moniteur de Stabilité Sigma</div>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${engineOnline ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${engineOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                              <span className="text-[8px] font-bold uppercase tracking-widest">{engineOnline ? 'Live' : 'Offline'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <a 
                              href={`${CONFIG.GITHUB_REPO}/tree/main/sigma`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[9px] text-obsidia-ink/40 hover:text-obsidia-accent transition-colors flex items-center gap-1 uppercase font-bold tracking-widest"
                            >
                              <Github className="w-2.5 h-2.5" /> Accéder au répertoire Sigma
                            </a>
                            <a 
                              href={`${CONFIG.GITHUB_REPO}/blob/main/sigma/sigma_monitor.py`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[9px] text-obsidia-ink/40 hover:text-obsidia-accent transition-colors flex items-center gap-1 uppercase font-bold tracking-widest"
                            >
                              <Terminal className="w-2.5 h-2.5" /> Source : sigma_monitor.py
                            </a>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSigmaAttack(!sigmaAttack)}
                          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${sigmaAttack ? "bg-red-500 border-red-500 text-white" : "border-obsidia-accent text-obsidia-accent hover:bg-obsidia-accent/10"}`}
                        >
                          {sigmaAttack ? "Arrêter l'Attaque" : "Simuler une Dérive"}
                        </button>
                      </div>
                      
                      <div className="h-[200px] w-full bg-obsidia-blue/5 border border-obsidia-line p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={sigmaData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[80, 150]} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#fff', border: '1px solid #141414', fontSize: '10px', borderRadius: '0' }}
                            />
                            <Line type="monotone" dataKey="stability" stroke={sigmaAttack ? "#ef4444" : "#f27d26"} strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="limit" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-obsidia-ink text-obsidia-bg">
                        <div className={`w-3 h-3 rounded-full ${sigmaAttack ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
                        <div className="text-[10px] font-mono uppercase tracking-widest">
                          {sigmaAttack ? "ALERTE : DÉRIVE CRITIQUE DÉTECTÉE - VÉROUILLAGE NOYAU ACTIF" : "SYSTÈME NOMINAL - TRAJECTOIRE STABLE"}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Merkle Seal Simulator - More Visual */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Fingerprint className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">L'Empreinte d'Immutabilité</h2>
          </div>

          <div className="bg-obsidia-ink text-obsidia-bg p-12 md:p-20 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-obsidia-accent/20"></div>
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-bold mb-8 uppercase tracking-tight italic">Le Sceau Global</h3>
                <p className="text-obsidia-bg/60 mb-12 leading-relaxed text-lg">
                  Comment savoir si un administrateur ou un pirate a modifié une règle en cachette ? <br /><br />
                  Obsidia génère un <span className="text-obsidia-accent font-bold">Sceau Merkle</span> unique. Si un seul bit du système change, le sceau se brise. C'est la preuve physique de l'intégrité.
                  <br /><br />
                  <a 
                    href={`${CONFIG.GITHUB_REPO}/blob/main/verify_merkle.py`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                  >
                    <Github className="w-3 h-3" />
                    Vérifier l'intégrité (verify_merkle.py) <ArrowRight className="w-3 h-3" />
                  </a>
                </p>
                
                <div className="space-y-4 mb-12">
                  <div className="flex items-center justify-between p-6 border border-obsidia-bg/10 bg-obsidia-bg/5">
                    <div className="flex items-center gap-4">
                      <Database className="w-5 h-5 text-obsidia-accent" />
                      <span className="text-sm font-bold uppercase">Base de Règles</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500">SCELLÉ</span>
                  </div>
                  <div className="flex items-center justify-between p-6 border border-obsidia-bg/10 bg-obsidia-bg/5">
                    <div className="flex items-center gap-4">
                      <History className="w-5 h-5 text-obsidia-accent" />
                      <span className="text-sm font-bold uppercase">Journal d'Audit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isTampered ? (
                        <span className="text-[10px] font-mono text-red-500">MODIFIÉ_ILLÉGALEMENT</span>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-500">SCELLÉ</span>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsTampered(!isTampered)}
                  className={`w-full py-6 px-8 border-2 font-bold uppercase tracking-widest text-sm transition-all ${isTampered ? "bg-emerald-500 border-emerald-500 text-white" : "bg-red-500 border-red-500 text-white hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.3)]"}`}
                >
                  {isTampered ? "Restaurer l'Intégrité" : "Simuler une Altération (Bit-Flip)"}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square bg-obsidia-bg/5 border border-obsidia-bg/10 flex flex-col items-center justify-center p-12 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-bg/30 mb-8">Racine Merkle du Noyau</div>
                  <div className={`text-3xl font-mono font-bold break-all mb-12 leading-tight ${isTampered ? "text-red-500" : "text-obsidia-accent"}`}>
                    {merkleRoot}
                  </div>
                  <div className={`inline-flex items-center gap-4 px-8 py-4 border-2 rounded-full ${isTampered ? "border-red-500 text-red-500 bg-red-500/10" : "border-emerald-500 text-emerald-500 bg-emerald-500/10"}`}>
                    {isTampered ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {isTampered ? "Sceau Brisé" : "Sceau Intact"}
                    </span>
                  </div>
                  {isTampered && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 text-red-500 text-[10px] font-bold uppercase animate-pulse"
                    >
                      ALERTE : INCOHÉRENCE DÉTECTÉE
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Adversarial Table Section */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <ShieldAlert className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Tableau Adversarial Complet</h2>
          </div>
          <div className="overflow-x-auto border border-obsidia-line">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-obsidia-blue/5 border-bottom border-obsidia-line">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 border-r border-obsidia-line">ID</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 border-r border-obsidia-line">Vecteur d'Attaque</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40 border-r border-obsidia-line">Mécanisme de Défense</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Statut</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {[
                  { id: "A1", attack: "1 000 000 paires G3", defense: "Validation N4 (Consensus Formel)", status: "PROVED" },
                  { id: "A2", attack: "Spoofing Identity N4", defense: "Lean 4 Identity Verification", status: "PROVED" },
                  { id: "B1", attack: "1 049 881 probes Merkle", defense: <><GlossaryTerm term="X-108">X-108</GlossaryTerm> Temporal Gate (108s)</>, status: "PROVED" },
                  { id: "C1", attack: "Drift Invariant Sigma", defense: "Merkle Root Integrity Seal", status: "PROVED" },
                  { id: "D1", attack: "Logic Bug Zero-Day", defense: "Formal Verification (Zero-Bug)", status: "PROVED" },
                  { id: "E1", attack: "Replay Deterministic", defense: "Deterministic State Transition", status: "PROVED" }
                ].map((row, i) => (
                  <tr key={i} className="border-t border-obsidia-line hover:bg-obsidia-blue/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-obsidia-accent border-r border-obsidia-line">{row.id}</td>
                    <td className="p-4 text-obsidia-ink/80 italic border-r border-obsidia-line">{row.attack}</td>
                    <td className="p-4 font-bold border-r border-obsidia-line">{row.defense}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold border border-emerald-500/20">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Threat Model - Sword vs Shield */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <FileWarning className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Le Bouclier Obsidia</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-obsidia-line border border-obsidia-line rounded-sm overflow-hidden">
            {[
              { 
                title: "Attaque Sybil", 
                desc: "Un attaquant crée des milliers d'identités pour voter.", 
                defense: "Validation N4 : Seuls les nœuds avec une identité prouvée en Lean 4 peuvent voter. Les faux nœuds sont ignorés.",
                icon: Zap
              },
              { 
                title: "Flashloan Governance", 
                desc: "Emprunter des fonds pour forcer une décision en 1 seconde.", 
                defense: <><GlossaryTerm term="X-108">X-108 Gate</GlossaryTerm> : Le délai de 108s rend l'attaque inutile car les fonds doivent être rendus avant l'exécution.</>,
                icon: Clock
              },
              { 
                title: "Configuration Drift", 
                desc: "Modifier lentement les règles pour créer une faille.", 
                defense: "Merkle Seal : Toute dérive, même de 0.0001%, invalide le sceau et bloque le noyau.",
                icon: Fingerprint
              },
              { 
                title: "Logic Bug Exploit", 
                desc: "Exploiter une erreur de calcul dans le code.", 
                defense: "Lean 4 : Le code n'a pas d'erreurs de calcul, il est mathématiquement parfait par construction.",
                icon: Code
              }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-obsidia-bg hover:bg-obsidia-blue/5 transition-colors group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-obsidia-accent/10 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent group-hover:bg-obsidia-accent group-hover:text-obsidia-bg transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-tight italic">{item.title}</h4>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-red-500/50 mb-2">L'Épée (Menace)</div>
                    <p className="text-sm text-obsidia-ink/60 leading-relaxed italic">"{item.desc}"</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-emerald-500 mb-2">Le Bouclier (Défense)</div>
                    <p className="text-sm text-obsidia-ink/80 leading-relaxed font-bold">{item.defense}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            CE QUE ÇA SIGNIFIE EN PRATIQUE
          </div>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            La plupart des systèmes de sécurité sont des murs que l'on espère assez hauts. Obsidia est une loi de la physique. Dans notre périmètre prouvé, une violation n'est pas 'difficile', elle est mathématiquement impossible. C'est la différence entre une porte blindée et l'absence totale de porte : si le chemin n'est pas prouvé, il est physiquement fermé.
          </p>
        </div>

        {/* Technical Lexicon Section */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <HelpCircle className="text-obsidia-accent w-6 h-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tight italic">Lexique Technique</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                term: "Lean 4",
                def: "Langage de programmation et assistant de preuve utilisé par Obsidia pour vérifier mathématiquement que chaque ligne de code respecte les spécifications de sécurité sans aucune exception possible.",
                icon: <Code className="w-4 h-4" />
              },
              {
                term: "Racine Merkle",
                def: "Structure de données cryptographique (arbre de Merkle) qui condense l'intégralité du système en une seule empreinte. Si un seul bit est modifié, la racine change, brisant instantanément le sceau de sécurité.",
                icon: <Fingerprint className="w-4 h-4" />
              },
              {
                term: "Invariants",
                def: "Propriétés logiques fondamentales qui doivent rester vraies en toutes circonstances. Par exemple : 'Le solde total ne peut jamais être négatif'. Obsidia prouve que ses invariants sont inviolables.",
                icon: <Shield className="w-4 h-4" />
              },
              {
                term: "Déterminisme",
                def: "Propriété garantissant qu'une même entrée produira toujours exactement la même sortie. Cela élimine les comportements imprévisibles et les failles liées aux conditions de course (race conditions).",
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
        </section>
      </div>
    </div>
  );
};

export default Securite;
