import { motion } from "motion/react";

const MentionsLegales = () => {
  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-[1px] bg-obsidia-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Transparence Légale</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
            Mentions <br />
            <span className="text-obsidia-accent">Légales</span>.
          </h1>
        </motion.div>

        <div className="space-y-12 text-obsidia-ink/60 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Éditeur du site</h2>
            <p>
              Le site Obsidia Governance Core est édité par : <br />
              <strong>Obsidia Governance</strong> <br />
              Adrien Etienne <br />
              Siège social : [Votre Adresse] <br />
              SIREN : [Votre SIREN]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Hébergement</h2>
            <p>
              Le site est hébergé par : <br />
              <strong>Google Cloud Run</strong> <br />
              Google LLC <br />
              1600 Amphitheatre Parkway <br />
              Mountain View, CA 94043, USA
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Responsable de publication</h2>
            <p>
              Adrien Etienne
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Contact</h2>
            <p>
              Email : aetienne08260@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus (textes, graphismes, logos, icônes, sons, logiciels) présents sur le site sont la propriété exclusive d'Obsidia Governance, sauf mention contraire. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
