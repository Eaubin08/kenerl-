import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ShieldCheck, History, Lock, ArrowRight, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert, Zap, Filter, Activity, Database, Cpu, Search, Binary, Github, Code, Fingerprint } from "lucide-react";
import GlossaryTerm from "../components/GlossaryTerm";
import { CONFIG } from "../config";

const Noyau = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeThreat, setActiveThreat] = useState(0);

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

        {/* Final Summary - Sealed Core */}
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
      </div>
    </div>
  );
};

export default Noyau;
