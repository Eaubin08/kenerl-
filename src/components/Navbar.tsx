import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Github, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONFIG } from "../config";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [engineOnline, setEngineOnline] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkEngine = async () => {
      try {
        const response = await fetch(`${CONFIG.ENGINE_URL}/api/health`);
        setEngineOnline(response.ok);
      } catch (error) {
        setEngineOnline(false);
      }
    };
    checkEngine();
    const interval = setInterval(checkEngine, 10000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Le Noyau", path: "/noyau" },
    { name: "Sécurité & Preuve", path: "/securite" },
    { name: "Fonctionnement", path: "/fonctionnement" },
    { name: "Cas Concrets", path: "/cas" },
    { name: "Branchement", path: "/branchement" },
    { name: "Intégration", path: "/integration" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-obsidia-bg/90 backdrop-blur-md border-b border-obsidia-line py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-obsidia-accent rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 border-2 border-obsidia-bg rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tighter uppercase leading-none">Obsidia</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${engineOnline === null ? 'bg-obsidia-accent animate-pulse' : engineOnline ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${engineOnline === null ? 'text-obsidia-ink/40' : engineOnline ? 'text-emerald-600' : 'text-red-600'}`}>
                  {engineOnline === null ? 'Checking' : engineOnline ? 'Engine Live' : 'Engine Offline'}
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-obsidia-ink/60">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-obsidia-accent transition-colors ${location.pathname === link.path ? "text-obsidia-accent" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/livre-blanc" 
            className={`hover:text-obsidia-accent transition-colors flex items-center gap-1 ${location.pathname === "/livre-blanc" ? "text-obsidia-accent" : ""}`}
          >
            <Github className="w-3 h-3" />
            Livre Blanc & Preuves
          </Link>
          <Link to="/contact" className="px-5 py-2 border border-obsidia-accent text-obsidia-accent hover:bg-obsidia-accent hover:text-obsidia-bg transition-all rounded-sm">
            Démo
          </Link>
        </div>

        <button className="lg:hidden text-obsidia-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-obsidia-bg border-b border-obsidia-line p-6 flex flex-col gap-4 lg:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${location.pathname === link.path ? "text-obsidia-accent" : "text-obsidia-ink/60"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/livre-blanc" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${location.pathname === "/livre-blanc" ? "text-obsidia-accent" : "text-obsidia-ink/60"}`}
            >
              <Github className="w-4 h-4" />
              Livre Blanc & Preuves
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 bg-obsidia-accent text-obsidia-bg font-bold text-center uppercase tracking-widest"
            >
              DEMANDER UNE DÉMO
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
