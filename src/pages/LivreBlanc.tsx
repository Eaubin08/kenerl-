import { motion } from "motion/react";
import { Github, ArrowRight, FileText, ShieldCheck, Code2, Terminal, BookOpen } from "lucide-react";
import { CONFIG } from "../config";

const LivreBlanc = () => {
  const resources = [
    {
      title: "Le Dépôt Principal (Proof Core)",
      desc: "Le noyau de preuve public contenant le code source exécutable, les spécifications formelles et les artefacts cryptographiques.",
      url: CONFIG.GITHUB_REPO,
      icon: Github,
      tag: "Code Source"
    },
    {
      title: "Livre Blanc (Architecture)",
      desc: "Documentation technique détaillée sur l'architecture du moteur, les protocoles de communication et la gestion des invariants.",
      url: `${CONFIG.GITHUB_REPO}/blob/main/README.md`,
      icon: FileText,
      tag: "Documentation"
    },
    {
      title: "Preuves Formelles (Lean 4)",
      desc: "Vérification mathématique des invariants critiques. Accédez aux théorèmes prouvant la sécurité du moteur.",
      url: `${CONFIG.GITHUB_REPO}/tree/main/proofs`,
      icon: ShieldCheck,
      tag: "Vérification Formelle"
    },
    {
      title: "Guide d'Audit Technique",
      desc: "Instructions pas à pas pour les auditeurs indépendants souhaitant reproduire les preuves et auditer le code.",
      url: `${CONFIG.GITHUB_REPO}/blob/main/AUDIT.md`,
      icon: BookOpen,
      tag: "Audit"
    },
    {
      title: "Pipelines de Test & Exemples",
      desc: "Scripts Python pour l'exécution de tests à grande échelle et exemples d'intégration concrets.",
      url: `${CONFIG.GITHUB_REPO}/tree/main/examples`,
      icon: Terminal,
      tag: "Validation"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-[1px] bg-obsidia-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Transparence & Preuves</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-[0.9]"
          >
            Livre Blanc <br />
            <span className="text-obsidia-accent">& Preuves</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed font-light max-w-2xl"
          >
            Obsidia n'est pas une boîte noire. Nous mettons à disposition l'intégralité de notre noyau de preuve pour permettre une vérification indépendante et mathématique de chaque invariant.
          </motion.p>
        </div>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            LE PARI DE LA TRANSPARENCE
          </div>
          <h3 className="text-2xl font-bold mb-6 text-obsidia-bg italic">"POURQUOI TOUT PUBLIER ?"</h3>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Dans le monde de la sécurité, le secret est souvent une faiblesse. Nous publions nos preuves Lean 4 et notre code source car nous n'avons rien à cacher. La sécurité d'Obsidia ne repose pas sur l'obscurité, mais sur la solidité de ses invariants. Si vous ne pouvez pas le vérifier, ne lui faites pas confiance.
          </p>
          <blockquote className="mt-8 p-6 bg-obsidia-accent text-obsidia-bg font-bold italic border-l-8 border-obsidia-bg/20">
            "La confiance est un risque. La preuve est une certitude."
          </blockquote>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {resources.map((res, idx) => (
            <motion.a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group p-10 border border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-obsidia-accent/10 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent group-hover:scale-110 transition-transform">
                  <res.icon className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-obsidia-ink/30 border border-obsidia-line px-2 py-1">
                  {res.tag}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight italic group-hover:text-obsidia-accent transition-colors">
                {res.title}
              </h3>
              <p className="text-obsidia-ink/50 text-sm leading-relaxed mb-8">
                {res.desc}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-obsidia-accent">
                Accéder à la ressource <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <res.icon className="w-32 h-32" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Technical Context Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="p-12 border-2 border-obsidia-accent/20 rounded-3xl bg-obsidia-ink text-obsidia-bg relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight">Pourquoi l'Open Source ?</h2>
              <p className="text-obsidia-bg/60 leading-relaxed mb-8">
                La confiance dans un système de gouvernance ne peut reposer sur des promesses. En publiant notre noyau de preuve, nous permettons à n'importe quel auditeur technique de vérifier que :
              </p>
              <ul className="space-y-4">
                {[
                  "Le code exécuté correspond aux spécifications formelles.",
                  "Les invariants ne peuvent être violés mathématiquement.",
                  "La traçabilité Merkle est intègre et infalsifiable.",
                  "Le moteur est déterministe et reproductible."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm italic">
                    <div className="w-5 h-5 rounded-full bg-obsidia-accent/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-obsidia-accent"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-12 border border-obsidia-line bg-obsidia-blue/5 rounded-3xl">
            <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight text-obsidia-accent">Limites Connues</h2>
            <p className="text-obsidia-ink/60 leading-relaxed mb-8">
              La transparence implique aussi de documenter les périmètres de sécurité actuels. Voici les limites identifiées dans la version 1.3.0 :
            </p>
            <ul className="space-y-4">
              {[
                { title: "Hypothèse Cryptographique", desc: "La sécurité repose sur la résistance de SHA-256 aux collisions." },
                { title: "Périmètre Formel", desc: "Seul le noyau de décision est prouvé ; l'interface utilisateur reste hors périmètre." },
                { title: "Connectivité", desc: "Le mode 'Offline Proof' nécessite une synchronisation périodique pour le registre global." },
                { title: "Latence Réseau", desc: "Bien que le noyau valide en < 5ms, la latence totale dépend de votre infrastructure réseau." }
              ].map((item, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-obsidia-accent rounded-full"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-obsidia-ink/50 italic ml-3.5">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verification Example */}
        <div className="p-12 border border-obsidia-line bg-obsidia-blue/5 rounded-3xl mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold italic mb-4 uppercase tracking-tight">Vérification Indépendante</h2>
              <p className="text-obsidia-ink/60 text-sm leading-relaxed">
                Utilisez nos outils de vérification pour auditer vos propres logs de gouvernance. Obsidia fournit des scripts Python et des spécifications Lean 4 pour garantir que vos actions n'ont jamais dévié de vos règles.
              </p>
            </div>
            <div className="p-8 border border-obsidia-line bg-obsidia-ink font-mono text-xs leading-relaxed text-obsidia-bg/40 rounded-xl">
              <div className="flex items-center gap-2 mb-4 text-obsidia-accent">
                <Code2 className="w-4 h-4" />
                <span>Verification Protocol v1.3.0</span>
              </div>
              <pre>
{`$ lean --version
Lean (version 4.7.0)

$ python verify_merkle.py
[INFO] Loading audit logs...
[INFO] Reconstructing Merkle Root...
[SUCCESS] Root matches 0x8f2e...
[SUCCESS] Formal Proof Verified.`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivreBlanc;
