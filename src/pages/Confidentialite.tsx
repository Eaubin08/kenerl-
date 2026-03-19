import { motion } from "motion/react";

const Confidentialite = () => {
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
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Protection des Données</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
            Politique de <br />
            <span className="text-obsidia-accent">Confidentialité</span>.
          </h1>
        </motion.div>

        <div className="space-y-12 text-obsidia-ink/60 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Données collectées</h2>
            <p>
              Obsidia Governance s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site obsidia-governance.run.app, soient conformes au règlement général sur la protection des données (RGPD).
              <br /><br />
              Les seules données collectées sont celles que vous saisissez volontairement dans le formulaire de contact :
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Nom</li>
                <li>Email</li>
                <li>Entreprise</li>
                <li>Secteur d'activité</li>
                <li>Message</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Finalité du traitement</h2>
            <p>
              Ces données sont collectées exclusivement pour répondre à vos demandes de démonstration ou d'information. Elles ne font l'objet d'aucun partage avec des tiers, ni d'aucune utilisation commerciale en dehors de la relation directe avec Obsidia Governance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant une durée maximale de 12 mois à compter de votre dernier contact avec nous.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Vos droits</h2>
            <p>
              Conformément à la réglementation européenne, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ces droits à tout moment en nous contactant à l'adresse suivante : <strong>aetienne08260@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-obsidia-ink mb-4 uppercase tracking-tight italic">Hébergement des données</h2>
            <p>
              Les données sont hébergées sur les serveurs de Google Cloud (région Europe).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;
