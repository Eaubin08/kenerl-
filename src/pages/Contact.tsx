import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Zap, History, Lock, ShieldCheck, Github } from "lucide-react";
import { CONFIG } from "../config";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 italic">Demander une démo</h1>
            <p className="text-xl text-obsidia-ink/60 leading-relaxed mb-12">
              Voyons où Obsidia se branche dans votre système. Si vous avez déjà des IA, agents, workflows ou décisions automatisées, regardons ensemble où une couche de gouvernance déterministe peut créer de la valeur sans refaire toute l'infrastructure.
              <br /><br />
              <a 
                href={`${CONFIG.GITHUB_REPO}/blob/main/AUDIT.md`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
              >
                <Github className="w-4 h-4" /> Auditeurs techniques : consultez notre Guide d'Audit <ArrowRight className="w-3 h-3" />
              </a>
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Diagnostic technique", desc: "Identification des points de branchement potentiels.", icon: Zap },
                { title: "Preuve de concept", desc: "Mise en place rapide du noyau sur un cas d'usage réel.", icon: History },
                { title: "Audit de gouvernance", desc: "Analyse des risques et de la traçabilité de vos systèmes.", icon: ShieldCheck }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-obsidia-accent/10 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-obsidia-ink/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-10 border border-obsidia-line bg-obsidia-blue/5 rounded-sm">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Prénom</label>
                      <input type="text" className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none" placeholder="Jean" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Nom</label>
                      <input type="text" className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Email Professionnel</label>
                    <input type="email" className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none" placeholder="jean.dupont@entreprise.com" required />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Entreprise</label>
                      <input type="text" className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none" placeholder="Nom de votre entreprise" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Secteur d'activité</label>
                      <select className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none appearance-none" required>
                        <option value="">Sélectionnez...</option>
                        <option value="finance">Finance / Fintech</option>
                        <option value="industrie">Industrie / IoT</option>
                        <option value="ia">Intelligence Artificielle</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/30 mb-2">Message</label>
                    <textarea className="w-full bg-obsidia-bg border border-obsidia-line p-4 text-sm text-obsidia-ink/70 focus:border-obsidia-accent outline-none h-32" placeholder="Parlez-nous de vos systèmes et de vos besoins en gouvernance..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 group">
                    Envoyer la demande <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-bold italic mb-4">Demande Reçue</h3>
                  <p className="text-obsidia-ink/60 leading-relaxed mb-8">
                    Votre demande de diagnostic a été transmise au noyau. <br />
                    Un ingénieur de gouvernance vous contactera sous 24h.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
