import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Noyau from "./pages/Noyau";
import Securite from "./pages/Securite";
import Fonctionnement from "./pages/Fonctionnement";
import Branchement from "./pages/Branchement";
import Integration from "./pages/Integration";
import CasConcrets from "./pages/CasConcrets";
import Contact from "./pages/Contact";
import LivreBlanc from "./pages/LivreBlanc";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";

// Scroll to top on route change and update title
const PageTitle = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const titles: { [key: string]: string } = {
      "/": "Obsidia Governance Core | Le Noyau de Gouvernance Formellement Prouvé",
      "/noyau": "Le Noyau Sigma | Obsidia Governance Core",
      "/securite": "Sécurité & Preuve Mathématique | Obsidia",
      "/fonctionnement": "Comment ça marche | Obsidia Governance Core",
      "/branchement": "Branchement Technique | Obsidia",
      "/integration": "Intégration Sigma Engine | Obsidia",
      "/cas": "Cas d'Usage | Obsidia Governance Core",
      "/contact": "Contact & Démo | Obsidia",
      "/livre-blanc": "Livre Blanc & Documentation | Obsidia",
      "/mentions-legales": "Mentions Légales | Obsidia Governance Core",
      "/confidentialite": "Politique de Confidentialité | Obsidia"
    };
    
    document.title = titles[pathname] || "Obsidia Governance Core";
  }, [pathname]);
  
  return null;
};

export default function App() {
  return (
    <Router>
      <PageTitle />
      <div className="min-h-screen bg-obsidia-bg text-obsidia-ink selection:bg-obsidia-accent selection:text-obsidia-bg">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noyau" element={<Noyau />} />
            <Route path="/securite" element={<Securite />} />
            <Route path="/fonctionnement" element={<Fonctionnement />} />
            <Route path="/branchement" element={<Branchement />} />
            <Route path="/integration" element={<Integration />} />
            <Route path="/cas" element={<CasConcrets />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/livre-blanc" element={<LivreBlanc />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
