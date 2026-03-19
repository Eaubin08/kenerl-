import { motion } from "motion/react";
import { ArrowRight, Zap, CheckCircle2, Layers, Cpu, Code2, Database, ShieldCheck, Terminal, Globe, Lock, Activity, Share2, Github } from "lucide-react";
import { CONFIG } from "../config";

const Integration = () => {
  const steps = [
    {
      title: "Interception",
      target: "Couche API / SDK",
      desc: "Obsidia s'insère au point d'entrée de vos commandes. Au lieu d'envoyer l'action directement à l'exécution, votre système l'envoie au noyau Obsidia via une requête sécurisée.",
      icon: Terminal,
      detail: "Compatible avec REST, gRPC et Webhooks."
    },
    {
      title: "Validation Déterministe",
      target: "Noyau Obsidia",
      desc: "Le noyau vérifie l'intention contre vos invariants (règles métier, limites de trésorerie, sécurité temporelle). Pas de probabilité, juste du vrai ou faux mathématique.",
      icon: Cpu,
      detail: "Sigma Engine : Latence < 5ms."
    },
    {
      title: "Scellement & Preuve",
      target: "Registre Immuable",
      desc: "Une fois validée, l'action est scellée avec une preuve de Merkle. La trace est indélébile, auditable en temps réel et cryptographiquement liée à l'intention originale.",
      icon: ShieldCheck,
      detail: "Preuve de Merkle exportable."
    },
    {
      title: "Libération Sécurisée",
      target: "Monde Réel / Blockchain",
      desc: "Obsidia libère l'action vers sa destination finale. L'exécution est désormais garantie conforme à votre gouvernance, protégée contre toute altération ultérieure.",
      icon: Globe,
      detail: "Signature multi-sig automatisée."
    }
  ];

  const methods = [
    {
      title: "SDK Natif",
      subtitle: "Performance Maximale",
      desc: "Intégrez Obsidia directement dans votre code source. Idéal pour les agents IA autonomes et les systèmes de trading haute fréquence nécessitant une latence ultra-faible.",
      icon: Code2,
      tech: ["Rust", "Go", "Node.js", "Python"],
      useCase: "Agents IA, Trading Bots"
    },
    {
      title: "Middleware API",
      subtitle: "Flexibilité Totale",
      desc: "Utilisez notre passerelle API pour filtrer les requêtes HTTP/gRPC sortantes. Compatible avec n'importe quelle architecture cloud moderne (AWS, GCP, Azure).",
      icon: Layers,
      tech: ["REST", "gRPC", "Webhooks"],
      useCase: "SaaS, Cloud Infrastructure"
    },
    {
      title: "Oracle de Gouvernance",
      subtitle: "On-Chain Security",
      desc: "Pour les protocoles DeFi et les DAOs. Obsidia agit comme un oracle déterministe validant les transactions avant leur inclusion définitive dans le bloc.",
      icon: Database,
      tech: ["Ethereum", "Solana", "L2s"],
      useCase: "DeFi, DAOs, Web3"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-[1px] bg-obsidia-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Protocole d'Implémentation Technique</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
            L'Architecture de <br />
            <span className="text-obsidia-accent">Contrôle</span>.
          </h1>
          <p className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed font-light max-w-2xl">
            Intégrer Obsidia ne signifie pas reconstruire. Cela signifie <span className="text-obsidia-ink font-medium italic">sécuriser l'existant</span> en ajoutant une couche de vérité absolue avant chaque action critique.
          </p>
        </div>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            POURQUOI CE N'EST PAS UNE MIGRATION
          </div>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Intégrer Obsidia n'est pas un projet d'infrastructure de six mois. C'est un branchement chirurgical. Nous ne vous demandons pas de changer votre stack, mais de sécuriser ses sorties. C'est une membrane de protection qui s'ajoute, sans friction, là où le risque est le plus élevé.
          </p>
        </div>

        {/* Integration Philosophy - Problem/Solution Style */}
        <div className="mb-32 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="p-12 bg-obsidia-ink text-obsidia-bg rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight">Le Risque d'Intégration Directe</h2>
              <p className="text-obsidia-bg/60 leading-relaxed mb-8">
                Sans Obsidia, vos agents IA ou vos systèmes automatisés parlent directement au monde réel. Une seule défaillance logique devient une catastrophe irréversible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic">Exécution aveugle des commandes erronées.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic">Absence de preuve d'intention auditable.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-12 border-2 border-obsidia-accent/20 rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight text-obsidia-accent">Le Branchement Middleware</h2>
              <p className="text-obsidia-ink/60 leading-relaxed mb-8">
                Obsidia s'interpose comme une <span className="text-obsidia-ink font-bold italic">membrane de validation</span>. Nous transformons chaque commande en une intention vérifiée mathématiquement avant toute exécution.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Validation des invariants métier en temps réel.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Scellement cryptographique de chaque action.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Integration Flow - Step by Step */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight italic mb-2">Le Flux d'Exécution Sécurisé</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Comment Obsidia transforme l'intention en action garantie.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-obsidia-line border border-obsidia-line overflow-hidden">
            {steps.map((step, i) => (
              <div key={i} className="bg-obsidia-bg p-10 hover:bg-obsidia-blue/5 transition-colors group relative">
                <div className="text-obsidia-accent font-mono text-[10px] mb-8 tracking-widest">PHASE_0{i+1}</div>
                <div className="w-12 h-12 bg-obsidia-ink text-obsidia-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold text-obsidia-accent uppercase tracking-widest mb-2">{step.target}</div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight italic">{step.title}</h3>
                <p className="text-sm text-obsidia-ink/50 leading-relaxed mb-6">{step.desc}</p>
                <div className="pt-4 border-t border-obsidia-line">
                  <span className="text-[9px] font-mono text-obsidia-accent/60 uppercase tracking-widest">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Methods Section */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight italic mb-2">Méthodes de Branchement</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Choisissez le point d'entrée adapté à votre stack technologique.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((method, i) => (
              <div key={i} className="p-10 border border-obsidia-line bg-obsidia-ink/5 hover:border-obsidia-accent/30 transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 border border-obsidia-line flex items-center justify-center text-obsidia-accent">
                    <method.icon className="w-7 h-7" />
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                    {method.tech.map((t, j) => (
                      <span key={j} className="text-[8px] font-mono px-2 py-1 bg-obsidia-ink text-obsidia-bg">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-obsidia-accent uppercase tracking-widest mb-2">{method.subtitle}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">{method.title}</h3>
                <p className="text-sm text-obsidia-ink/60 leading-relaxed mb-8">{method.desc}</p>
                
                <div className="mb-8 p-4 bg-obsidia-accent/5 border-l-2 border-obsidia-accent">
                  <div className="text-[9px] uppercase tracking-widest text-obsidia-accent font-bold mb-1">Usage Principal</div>
                  <p className="text-xs italic font-medium">{method.useCase}</p>
                </div>

                <a 
                  href={`${CONFIG.GITHUB_REPO}/blob/main/README.md`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pt-6 border-t border-obsidia-line flex items-center gap-2 text-obsidia-accent font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Github className="w-3 h-3" />
                  Consulter la documentation technique <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Diagram Section */}
        <div className="bg-obsidia-ink text-obsidia-bg p-12 md:p-24 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-obsidia-accent h-full"></div>
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight italic">L'Insertion du Noyau</h2>
              <p className="text-obsidia-bg/40 uppercase tracking-widest text-xs">Visualisation du branchement middleware déterministe</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left Side: Client Infrastructure */}
              <div className="w-full md:w-1/3 space-y-4">
                <div className="p-6 border border-obsidia-bg/20 bg-obsidia-bg/5 rounded-xl text-center">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Agent IA / Système</div>
                  <div className="text-lg font-bold italic">Intention d'Action</div>
                </div>
                <div className="flex justify-center">
                   <ArrowRight className="rotate-90 md:rotate-0 text-obsidia-accent w-8 h-8 animate-pulse" />
                </div>
              </div>

              {/* Center: Obsidia Core */}
              <div className="w-full md:w-1/3">
                <div className="p-10 border-4 border-obsidia-accent bg-obsidia-bg text-obsidia-ink shadow-[0_0_80px_rgba(242,125,38,0.3)] rounded-2xl text-center relative">
                  <div className="absolute -top-3 -right-3">
                    <Zap className="w-8 h-8 text-obsidia-accent fill-obsidia-accent" />
                  </div>
                  <div className="text-3xl font-bold uppercase tracking-tighter italic">Obsidia Core</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-obsidia-accent mt-3 font-bold">Noyau Déterministe</div>
                </div>
              </div>

              {/* Right Side: Real Action */}
              <div className="w-full md:w-1/3 space-y-4">
                <div className="flex justify-center">
                   <ArrowRight className="rotate-90 md:rotate-0 text-obsidia-accent w-8 h-8" />
                </div>
                <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-xl text-center">
                  <div className="text-[10px] uppercase tracking-widest text-emerald-500/60 mb-2">Exécution Garantie</div>
                  <div className="text-lg font-bold italic text-emerald-500">Action Réelle</div>
                </div>
              </div>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 pt-12 border-t border-obsidia-bg/10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-4 h-4 text-red-500" />
                  <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs">Avant Intégration</h4>
                </div>
                <p className="text-sm opacity-50 italic leading-relaxed">
                  "L'IA envoie une commande. Si elle hallucine ou si la clé est volée, l'action est exécutée immédiatement. Le risque est total, sans aucun point de contrôle entre l'intention et l'effet."
                </p>
              </div>
              <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Après Intégration</h4>
                </div>
                <p className="text-sm opacity-80 leading-relaxed">
                  "L'IA envoie une intention. Obsidia la valide instantanément contre vos invariants. L'action n'est libérée que si elle est mathématiquement sûre. Vous gardez le contrôle souverain."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-8 italic">Prêt pour le branchement ?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4 group">
              Démarrer l'intégration <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-12 py-5 border border-obsidia-ink/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-sm font-bold">
              Parler à un architecte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
