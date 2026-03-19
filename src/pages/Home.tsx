import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, History, Lock, Zap, Cpu, Terminal, Layout, Info, Activity, Globe, CheckCircle2, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Quiz from "../components/Quiz";

import { CONFIG } from "../config";

const Home = () => {
  const [engineStatus, setEngineStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [engineData, setEngineData] = useState({ version: 'v1.3.0', uptime: '99.99%', latency: '2.4ms' });

  useEffect(() => {
    const checkEngine = async () => {
      const start = performance.now();
      try {
        const response = await fetch(`${CONFIG.ENGINE_URL}/api/health`);
        const end = performance.now();
        const latency = (end - start).toFixed(1) + 'ms';
        
        if (response.ok) {
          const data = await response.json();
          setEngineStatus('online');
          setEngineData(prev => ({ 
            ...prev, 
            version: data.version || prev.version,
            latency: latency
          }));
        } else {
          setEngineStatus('offline');
        }
      } catch (error) {
        setEngineStatus('offline');
      }
    };
    checkEngine();
    const interval = setInterval(checkEngine, 5000);
    return () => clearInterval(interval);
  }, []);

  const navGuide = [
    {
      title: "Le Noyau (Core)",
      path: "/noyau",
      icon: Cpu,
      desc: "Découvrez l'architecture technique d'Obsidia, notre moteur de décision déterministe."
    },
    {
      title: "Sécurité & Invariants",
      path: "/securite",
      icon: ShieldCheck,
      desc: "Comprenez comment nous utilisons les mathématiques pour verrouiller l'exécution logicielle."
    },
    {
      title: "Cas Concrets",
      path: "/cas",
      icon: Activity,
      desc: "Explorez des exemples réels d'application dans la finance, l'industrie et l'IA."
    },
    {
      title: "Branchement & Intégration",
      path: "/branchement",
      icon: Zap,
      desc: "Apprenez comment Obsidia s'insère physiquement dans votre infrastructure existante."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="relative mb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-obsidia-accent/20 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-[1px] bg-obsidia-accent"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Noyau de Gouvernance Déterministe</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-8 italic tracking-tighter">
                Obsidia Kernel : <br />
                <span className="text-obsidia-accent">Verrouillez</span> l'Action.
              </h1>
              <p className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed mb-10 max-w-3xl font-light">
                Nous vendons un <span className="text-obsidia-ink font-medium italic">middleware de contrôle critique</span>. Obsidia intercepte les intentions de vos systèmes (IA, Agents, Algorithmes) et garantit mathématiquement qu'aucune action hors-périmètre ne sera jamais exécutée.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/contact" className="px-10 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4 group">
                  Demander une démo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/noyau" className="px-10 py-5 border border-obsidia-ink/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-sm font-bold flex items-center justify-center">
                  Explorer la technologie
                </Link>
              </div>

              {/* Proof Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-obsidia-blue/5 border border-obsidia-line rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">pytest: 100% pass</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-obsidia-blue/5 border border-obsidia-line rounded-sm">
                  <Code className="w-4 h-4 text-obsidia-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Lean 4: Verified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-obsidia-blue/5 border border-obsidia-line rounded-sm">
                  <Terminal className="w-4 h-4 text-obsidia-ink/60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">TLA+: Model Checked</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-obsidia-blue/5 border border-obsidia-line rounded-sm">
                  <Lock className="w-4 h-4 text-obsidia-ink/60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">RFC 3161: Compliant</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Engine Status Badge */}
          <div className="absolute bottom-0 right-0 hidden xl:block">
            <div className="p-6 bg-obsidia-bg border border-obsidia-line shadow-2xl min-w-[240px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/40">Sigma Engine Status</div>
                  {engineStatus === 'online' && (
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-emerald-500"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${engineStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : engineStatus === 'offline' ? 'bg-red-500' : 'bg-obsidia-accent animate-pulse'}`}></div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${engineStatus === 'online' ? 'text-emerald-600' : engineStatus === 'offline' ? 'text-red-600' : 'text-obsidia-accent'}`}>
                    {engineStatus === 'online' ? 'Live' : engineStatus === 'offline' ? 'Offline' : 'Checking...'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-obsidia-ink/40 uppercase">Version</span>
                  <span className="text-[10px] font-mono font-bold">{engineData.version}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-obsidia-ink/40 uppercase">Uptime</span>
                  <span className="text-[10px] font-mono font-bold">{engineData.uptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-obsidia-ink/40 uppercase">Latency</span>
                  <span className="text-[10px] font-mono font-bold text-obsidia-accent">{engineData.latency}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-obsidia-line">
                <div className="text-[9px] text-obsidia-ink/30 italic uppercase">Dernière vérification : {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Value Section - Problem vs Solution */}
        <div className="mb-32 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="p-12 bg-obsidia-ink text-obsidia-bg rounded-3xl flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-6">Le Risque : L'Incertitude de l'Automatisation</div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight">L'Exécution sans Garde-Fou</h2>
              <p className="text-obsidia-bg/60 leading-relaxed mb-8">
                Aujourd'hui, vos systèmes (IA, Smart Contracts, IoT) agissent en "boîte noire". Une erreur de code ou une hallucination d'IA peut vider une trésorerie ou arrêter une usine en millisecondes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic opacity-80">Pertes financières irréversibles par erreur logicielle.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic opacity-80">Responsabilité juridique non couverte sur les actions autonomes.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-12 border-2 border-obsidia-accent/20 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-6">La Solution : La Certitude Obsidia</div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight text-obsidia-accent">Le Déterminisme Imposé</h2>
              <p className="text-obsidia-ink/60 leading-relaxed mb-8">
                Obsidia s'insère comme un <span className="text-obsidia-ink font-bold italic">disjoncteur mathématique</span>. Nous imposons des invariants critiques qui ne peuvent être violés, peu importe l'erreur du système source.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Neutralisation des erreurs fatales avant l'exécution.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Preuve d'intégrité opérationnelle pour les régulateurs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            POURQUOI OBSIDIA EXISTE
          </div>
          <h3 className="text-2xl font-bold mb-6 text-obsidia-bg italic">"NOTRE CONVICTION"</h3>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            En 2024, nous avons assisté à l'accélération d'un phénomène inquiétant : des systèmes automatisés de plus en plus puissants, déployés de plus en plus vite, avec de moins en moins de capacité de contrôle réel. Nous avons créé Obsidia non pas pour freiner l'innovation, mais pour lui donner un sol ferme. Sans déterminisme mathématique, l'automatisation n'est qu'une roulette russe à haute fréquence.
          </p>
        </div>

        {/* Product Details - What we sell */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">Notre Produit</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Une suite logicielle pour la gouvernance critique.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Obsidia Kernel", 
                icon: Cpu, 
                desc: "Le middleware central qui reçoit les intentions et applique les invariants déterministes en millisecondes.",
                detail: "Noyau écrit en Rust pour une performance et une sécurité mémoire absolue."
              },
              { 
                title: "SDKs d'Intégration", 
                icon: Terminal, 
                desc: "Bibliothèques prêtes à l'emploi pour brancher Obsidia sur vos APIs, Smart Contracts ou Agents IA.",
                detail: "Support natif gRPC, REST et Solidity."
              },
              { 
                title: "Preuves de Merkle", 
                icon: Lock, 
                desc: "Génération automatique d'un historique scellé et auditable de chaque décision prise par le noyau.",
                detail: "Auditabilité totale sans compromis sur la confidentialité."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-10 border border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent/30 transition-all group">
                <item.icon className="w-12 h-12 text-obsidia-accent mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-obsidia-ink/60 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-6 border-t border-obsidia-line text-[10px] font-bold uppercase tracking-widest text-obsidia-accent">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section - Interactive Value Demo */}
        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">Testez votre Gouvernance</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Évaluez votre exposition au risque d'exécution en 60 secondes.</p>
          </div>
          <Quiz />
        </section>

        {/* Navigation Guide - Understanding the App */}
        <section className="mb-32 pt-24 border-t border-obsidia-line">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 italic uppercase tracking-tight">Guide de Navigation</h2>
            <p className="text-obsidia-ink/60">
              Pour comprendre Obsidia dans sa globalité, nous avons structuré notre documentation en quatre piliers fondamentaux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navGuide.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path}
                className="p-8 border border-obsidia-line bg-obsidia-ink text-obsidia-bg hover:bg-obsidia-accent hover:border-obsidia-accent transition-all group rounded-2xl"
              >
                <item.icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-4 uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-obsidia-bg/40 text-xs leading-relaxed group-hover:text-obsidia-bg/80 transition-colors">
                  {item.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Visiter la page <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center bg-obsidia-ink text-obsidia-bg p-16 md:p-24 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-obsidia-accent h-full"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic tracking-tighter uppercase">
              Prêt à <span className="text-obsidia-accent">Sécuriser</span> l'Exécution ?
            </h2>
            <p className="text-xl opacity-60 mb-12 max-w-2xl mx-auto font-light">
              Ne laissez plus l'incertitude gouverner vos systèmes critiques. Installez le noyau de confiance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="px-12 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4">
                Prendre rendez-vous <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/cas" className="px-12 py-5 border border-obsidia-bg/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-sm font-bold">
                Voir les cas d'usage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
