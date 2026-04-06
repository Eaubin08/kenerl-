import { motion } from "motion/react";
import { ArrowRight, Zap, CheckCircle2, Github } from "lucide-react";
import { CONFIG } from "../config";

const Branchement = () => {
  const profiles = [
    {
      role: "Finance Décentralisée (DeFi)",
      need: "Neutraliser les attaques éclair et les manipulations de transactions.",
      why: "Pour garantir la sécurité des fonds et la confiance des utilisateurs.",
      where: "S'intercale entre la transaction et le smart contract pour bloquer les anomalies de flux."
    },
    {
      role: "Organisations Autonomes (DAOs)",
      need: "Empêcher les prises de contrôle hostiles de la gouvernance.",
      why: "Pour protéger l'intégrité des votes et la vision à long terme du projet.",
      where: "Filtre les propositions de vote avant qu'elles n'atteignent le registre immuable."
    },
    {
      role: "Trésoreries d'Entreprise",
      need: "Sécuriser les flux de capitaux massifs.",
      why: "Pour éliminer le risque de vol interne ou de compromission de clés privées.",
      where: "Verrouille les transferts sortants massifs derrière un délai de sécurité physique."
    },
    {
      role: "Développeurs d'IA",
      need: "Gouverner les actions des agents autonomes.",
      why: "Pour déployer des agents puissants sans risquer des sorties imprévisibles ou dangereuses.",
      where: "Intercepte les commandes de l'agent vers le monde réel pour valider leur conformité."
    }
  ];

  const points = [
    { 
      title: "Garde-Fou IA Autonome", 
      target: "IA & Agents Autonomes",
      problem: "L'IA peut vider un portefeuille par erreur ou hallucination.",
      value: "Obsidia agit comme un disjoncteur déterministe. Si l'action de l'IA viole vos règles de sécurité, elle est bloquée à la source." 
    },
    { 
      title: "Protection contre les attaques éclair", 
      target: "Finance Décentralisée (DeFi)",
      problem: "Des attaques ultra-rapides peuvent vider vos fonds en quelques secondes.",
      value: "Le protocole X-108 impose un délai de sécurité de 108s. Les attaques instantanées deviennent impossibles par conception." 
    },
    { 
      title: "Coffre-Fort de Trésorerie", 
      target: "Organisations & Trésoreries",
      problem: "Une clé d'accès volée = perte totale immédiate.",
      value: "Obsidia ajoute une 'Preuve de Patience'. Même avec les clés, l'attaquant est bloqué, vous laissant le temps de réagir." 
    },
    { 
      title: "Auditabilité Mathématique", 
      target: "Compliance & Audit",
      problem: "Impossible de prouver l'intégrité d'une IA en temps réel.",
      value: "Chaque branchement génère une preuve de Merkle immuable. La preuve mathématique remplace la confiance aveugle." 
    },
    { 
      title: "Contrôle de Périmètre IA", 
      target: "Développeurs Web3",
      problem: "Les agents IA peuvent abuser de leurs permissions API.",
      value: "Obsidia définit un périmètre de sécurité strict. L'IA reste autonome, mais ses actions sont filtrées par vos invariants critiques." 
    },
    { 
      title: "Zéro Erreur Opérationnelle", 
      target: "Ops & Treasury Managers",
      problem: "L'erreur humaine (fat-finger) sur des millions de dollars.",
      value: "Le noyau Sigma détecte les anomalies de flux. Une erreur de saisie devient une anomalie d'invariant et l'exécution est suspendue." 
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-[1px] bg-obsidia-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Middleware de Gouvernance Stratégique</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
            Obsidia : Le <br />
            <span className="text-obsidia-accent">Connecteur</span> de Confiance.
          </h1>
          <p className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed font-light max-w-2xl">
            Obsidia n'est pas une option, c'est une <span className="text-obsidia-ink font-medium italic">nécessité vitale</span> pour toute entité dont l'exécution dépend de systèmes complexes. Nous neutralisons le risque terminal.
          </p>
        </div>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            CE QU'ON A VU ARRIVER
          </div>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Nous avons vu des trésoreries de DAOs vidées en 12 secondes, des agents IA liquider des positions par simple erreur de contexte, et des infrastructures critiques compromises par une seule clé API. Ces incidents ne sont pas des fatalités, ce sont des absences de branchement. Obsidia est le disjoncteur qui aurait dû être là.
          </p>
        </div>

        {/* Strategic Value Section - The "WHY" */}
        <div className="mb-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="p-12 bg-obsidia-ink text-obsidia-bg rounded-3xl">
            <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight">Le Problème : L'Incertitude Terminale</h2>
            <p className="text-obsidia-bg/60 leading-relaxed mb-8">
              Aujourd'hui, une seule erreur de code, une hallucination d'IA ou une clé compromise peut vider une trésorerie en millisecondes. L'exécution est devenue trop rapide pour l'humain, et trop risquée pour l'automatisation pure.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <p className="text-sm italic">"Une erreur de 0.1% dans un smart contract = 100% de perte."</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <p className="text-sm italic">"Un agent IA autonome sans garde-fou est une bombe à retardement."</p>
              </div>
            </div>
          </div>
          
          <div className="p-12 border-2 border-obsidia-accent/20 rounded-3xl">
            <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight text-obsidia-accent">La Solution : Le Déterminisme</h2>
            <p className="text-obsidia-ink/60 leading-relaxed mb-8">
              Obsidia s'insère comme un <span className="text-obsidia-ink font-bold italic">disjoncteur intelligent</span>. Nous ne remplaçons pas vos systèmes, nous les rendons <span className="text-obsidia-ink font-bold">incassables</span> en imposant des invariants mathématiques et temporels.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                <p className="text-sm font-medium">Neutralisation instantanée des vecteurs d'attaque flash.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                <p className="text-sm font-medium">Auditabilité mathématique totale de chaque décision.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Target Profiles Section - The "WHO" */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight italic mb-2">Cas d'Usage Stratégiques</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Qui bénéficie du branchement Obsidia ?</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profiles.map((profile, i) => (
              <div key={i} className="p-8 border border-obsidia-line bg-obsidia-ink/5 hover:bg-obsidia-accent/10 transition-colors group relative">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Zap className="w-6 h-6 text-obsidia-accent" />
                </div>
                <div className="text-obsidia-accent font-bold text-[10px] uppercase tracking-widest mb-4">Secteur {i+1}</div>
                <h3 className="text-xl font-bold italic mb-6 text-obsidia-ink">{profile.role}</h3>
                
                <div className="space-y-6 text-sm text-obsidia-ink">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-red-500/60 font-bold mb-1">Ce qu'on bloque</div>
                    <p className="opacity-60 group-hover:opacity-100 transition-opacity italic">"{profile.need}"</p>
                  </div>
                  
                  <div className="pl-4 border-l border-obsidia-accent/30">
                    <div className="text-[10px] uppercase tracking-widest text-obsidia-accent font-bold mb-1">Où on se branche</div>
                    <p className="font-medium">{profile.where}</p>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-bold mb-1">Ce qu'on garantit</div>
                    <p className="opacity-60 group-hover:opacity-100 transition-opacity">{profile.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Points Section - The "HOW" */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight italic mb-2">Points d'Impact Stratégique</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Où Obsidia verrouille-t-il votre valeur ?</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap className="w-24 h-24" />
                </div>
                <div className="text-[10px] font-bold text-obsidia-accent uppercase tracking-[0.2em] mb-2">{p.target}</div>
                <h3 className="text-xl font-bold mb-6 uppercase tracking-tight leading-tight italic">{p.title}</h3>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-red-500/60 font-bold mb-1">Le Risque</div>
                    <p className="text-obsidia-ink/40 text-sm leading-relaxed italic">"{p.problem}"</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-bold mb-1">La Valeur Obsidia</div>
                    <p className="text-obsidia-ink/70 text-sm leading-relaxed">{p.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Summary Section */}
        <div className="bg-obsidia-bg border border-obsidia-line p-12 md:p-24 rounded-3xl text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="grid grid-cols-12 h-full w-full">
               {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="border-r border-obsidia-accent h-full"></div>
               ))}
             </div>
           </div>
           
           <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-4xl font-bold mb-12 uppercase tracking-tight italic leading-tight">
               Le Branchement qui <span className="text-obsidia-accent">Neutralise</span> l'Incertitude
             </h2>
             
             <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-md p-6 border border-obsidia-ink/10 bg-white/5 rounded-xl">
                  <div className="text-[10px] uppercase tracking-widest text-obsidia-ink/40 mb-2">Source de Risque (Vos Systèmes)</div>
                  <div className="text-lg font-bold italic">IA, Agents, Portefeuilles Sécurisés, Finance Décentralisée</div>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="rotate-90 text-obsidia-accent w-10 h-10 animate-bounce" />
                  <div className="my-4 px-12 py-10 border-4 border-obsidia-accent bg-obsidia-bg shadow-[0_0_70px_rgba(242,125,38,0.4)] rounded-2xl">
                    <div className="text-3xl font-bold uppercase tracking-tighter italic">Obsidia Core</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-obsidia-accent mt-3 font-bold">Middleware Déterministe</div>
                  </div>
                  <ArrowRight className="rotate-90 text-obsidia-accent w-10 h-10" />
                </div>

                <div className="w-full max-w-md p-6 border border-obsidia-ink/10 bg-emerald-500/5 rounded-xl">
                  <div className="text-[10px] uppercase tracking-widest text-emerald-500/60 mb-2">Résultat Garanti (Le Réel)</div>
                  <div className="text-lg font-bold italic text-emerald-600">Action Sécurisée & Auditable</div>
                </div>
             </div>

             <div className="mt-16 pt-12 border-t border-obsidia-line">
               <p className="text-obsidia-ink/50 italic text-lg mb-8">
                 "Brancher Obsidia, c'est décider que le chaos n'a plus sa place dans votre exécution."
               </p>
               <div className="flex justify-center">
                 <button className="px-12 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4">
                   Sécuriser mon infrastructure <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
               <div className="mt-12 flex justify-center">
                 <a 
                   href={CONFIG.GITHUB_REPO} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                 >
                   <Github className="w-4 h-4" /> Explorer le code source <ArrowRight className="w-3 h-3" />
                 </a>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Branchement;
