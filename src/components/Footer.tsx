import { Link } from "react-router-dom";
import { Github } from "lucide-react";

import { CONFIG } from "../config";

const Footer = () => {
  return (
    <footer className="py-20 bg-obsidia-bg border-t border-obsidia-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-obsidia-accent rounded-sm"></div>
              <span className="text-xl font-display font-bold tracking-tighter uppercase">Obsidia</span>
            </div>
            <p className="text-obsidia-ink/40 text-sm max-w-md leading-relaxed">
              Le noyau de gouvernance déterministe qui contrôle les systèmes avant qu'ils passent à l'action. Sécurité native, traçabilité absolue, preuve vérifiable.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-ink/30 mb-6">Produit</h4>
            <ul className="space-y-3 text-sm text-obsidia-ink/60">
              <li><Link to="/noyau" className="hover:text-obsidia-accent transition-colors">Le Noyau</Link></li>
              <li><Link to="/securite" className="hover:text-obsidia-accent transition-colors">Sécurité & Preuve</Link></li>
              <li><Link to="/fonctionnement" className="hover:text-obsidia-accent transition-colors">Fonctionnement</Link></li>
              <li><Link to="/integration" className="hover:text-obsidia-accent transition-colors">Intégration</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-ink/30 mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-obsidia-ink/60">
              <li><Link to="/contact" className="hover:text-obsidia-accent transition-colors">Demander une démo</Link></li>
              <li><Link to="/cas" className="hover:text-obsidia-accent transition-colors">Cas Concrets</Link></li>
              <li>
                <a 
                  href={`${CONFIG.GITHUB_REPO}/blob/main/README.md`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-obsidia-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-3 h-3" />
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-obsidia-ink/30 mb-6">Preuves Techniques</h4>
            <ul className="space-y-3 text-sm text-obsidia-ink/60">
              <li>
                <Link to="/livre-blanc" className="hover:text-obsidia-accent transition-colors flex items-center gap-2">
                  Livre Blanc (Architecture)
                </Link>
              </li>
              <li>
                <a 
                  href={CONFIG.GITHUB_REPO} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-obsidia-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-3 h-3" />
                  Sigma Engine (GitHub)
                </a>
              </li>
              <li>
                <a 
                  href={`${CONFIG.GITHUB_REPO}/blob/main/AUDIT_GUIDE.md?v=1.3.0`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-obsidia-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-3 h-3" />
                  Guide d'Audit v1.3.0
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-obsidia-line flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-obsidia-ink/30">
          <div>© 2026 Obsidia Governance. Tous droits réservés.</div>
          <div className="flex gap-8">
            <Link to="/mentions-legales" className="hover:text-obsidia-ink transition-colors">Mentions Légales</Link>
            <Link to="/confidentialite" className="hover:text-obsidia-ink transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
