import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { CheckCircle2, ArrowRight, Zap, Lock, ShieldCheck, Terminal, Cpu, Activity, Clock, XCircle, History, Search, ChevronDown, ChevronUp, Github } from "lucide-react";
import GlossaryTerm from "../components/GlossaryTerm";
import { CONFIG } from "../config";

const CasConcrets = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState(0);
  const [simulationStep, setSimulationStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    { id: "all", label: "Tous" },
    { id: "finance", label: "Finance & Fintech" },
    { id: "industry", label: "Industrie & IoT" },
    { id: "ai", label: "IA & Agents" },
    { id: "health", label: "Santé & Pharma" },
    { id: "cyber", label: "Cybersécurité" },
    { id: "legal", label: "Legal & Compliance" },
    { id: "retail", label: "Retail & E-commerce" },
    { id: "erp", label: "ERP & Back Office" },
    { id: "public", label: "Secteur Public" },
    { id: "energy", label: "Énergie" },
    { id: "defense", label: "Défense" },
    { id: "supply", label: "Supply Chain" },
    { id: "insurance", label: "Assurance" }
  ];

  const scenarios = [
    {
      title: "Virement Bancaire Haute Valeur",
      sector: "finance",
      risk: "Critique",
      status: "HOLD",
      proposition: "Agent IA : 'Transférer 500k€ vers nouveau compte FR76...'",
      obsidiaRole: <>Vérification de l'invariant <GlossaryTerm term="X-108">X-108</GlossaryTerm> : Délai de réflexion de 108s imposé pour tout virement &gt; 100k€ vers bénéficiaire non certifié.</>,
      outcome: <>Action suspendue. Signature <GlossaryTerm term="Racine Merkle">Merkle</GlossaryTerm> en attente de validation humaine.</>,
      technicalPoint: "Passerelle SWIFT / ISO20022"
    },
    {
      title: "Maintenance Turbine Critique",
      sector: "industry",
      risk: "Moyen",
      status: "ACT",
      proposition: "Système IoT : 'Arrêt d'urgence Turbine #42 (Vibration détectée)'",
      obsidiaRole: <>Vérification <GlossaryTerm term="Sigma Engine">Sigma</GlossaryTerm> : L'arrêt est-il conforme aux courbes de décélération sécurisées pour éviter un choc thermique ?</>,
      outcome: "Arrêt autorisé. Commande PLC validée et scellée.",
      technicalPoint: "Middleware gRPC / PLC"
    },
    {
      title: "Accès Données Sensibles (IA)",
      sector: "ai",
      risk: "Élevé",
      status: "BLOCK",
      proposition: "Agent IA : 'Extraire 1000 derniers dossiers patients pour analyse'",
      obsidiaRole: "Vérification du quota : Requête hors limites temporelles (max 50/heure). Origine cryptographique non reconnue.",
      outcome: "Accès refusé. Alerte de sécurité générée.",
      technicalPoint: "API Gateway / FHIR"
    }
  ];

  const governanceTemplates = [
    {
      id: "trading",
      name: "Template: Trading Haute Fréquence",
      invariant: "σ < 0.65 | Drawdown < 15%",
      desc: "Stoppe instantanément les algorithmes en cas de dérive de volatilité ou de perte subite.",
      metrics: ["Sharpe Ratio", "Volatility Band"]
    },
    {
      id: "bank",
      name: "Template: Flux Financiers",
      invariant: "KYC > 0.70 | AML Verified",
      desc: "Gouverne les transferts en vérifiant l'identité et la conformité des flux en millisecondes.",
      metrics: ["Compliance Vector", "Risk Score"]
    },
    {
      id: "iot",
      name: "Template: Infrastructure IoT",
      invariant: "Temp < 85°C | Pressure < 12bar",
      desc: "Intercepte les commandes industrielles pour garantir qu'elles restent dans l'enveloppe de sécurité physique.",
      metrics: ["Sensor Integrity", "Safety Envelope"]
    },
    {
      id: "ai",
      name: "Template: Agentic Safety",
      invariant: "Tool Use = Authorized | No Delete",
      desc: "Limite les capacités des agents IA aux outils et actions explicitement autorisés par la politique de sécurité.",
      metrics: ["Action Scope", "Identity Proof"]
    }
  ];

  const cases = [
    {
      title: "Gouvernance d'Agents Autonomes",
      sector: "ai",
      risk: "Critique",
      desc: "Obsidia contrôle les outils (API, DB) utilisés par les agents pour éviter les actions irréversibles non contrôlées.",
      where: "S'intercale entre le LLM et l'outil d'exécution (Tool Use).",
      guarantee: "Garantit qu'aucune commande destructrice n'est libérée sans preuve de conformité.",
      tags: ["Agentic AI", "Safety", "X-108"]
    },
    {
      title: "Trading Algorithmique",
      sector: "finance",
      risk: "Élevé",
      desc: "Mise en place de 'Circuit Breakers' déterministes basés sur la stabilité Sigma pour stopper les algos en cas de dérive.",
      where: "Directement intégré dans le moteur d'exécution via SDK Rust.",
      guarantee: "Neutralise les flash-crashes causés par des boucles de rétroaction algorithmiques.",
      tags: ["Fintech", "Sigma", "Real-time"]
    },
    {
      title: "Smart Grids & Énergie",
      sector: "industry",
      risk: "Élevé",
      desc: "Régulation des flux de charge pour éviter la surcharge du réseau local lors de pics de consommation électrique.",
      where: "Noyau de contrôle des transformateurs et bornes de recharge.",
      guarantee: "Empêche physiquement le dépassement de la capacité de charge du transformateur.",
      tags: ["Energy", "IoT", "Safety"]
    },
    {
      title: "Défense & Robotique",
      sector: "ai",
      risk: "Critique",
      desc: "Verrouillage des protocoles de mouvement autonome pour garantir le respect strict des règles d'engagement (ROE).",
      where: "Embarqué dans le contrôleur de vol ou le système de navigation.",
      guarantee: "Preuve mathématique que l'engin ne peut pas sortir de son périmètre autorisé.",
      tags: ["Defense", "Robotics", "Lean 4"]
    },
    {
      title: "Chaîne Logistique Critique",
      sector: "industry",
      risk: "Moyen",
      desc: "Traçabilité et preuve d'intégrité (Merkle) sur chaque changement d'état d'un colis sensible ou d'un médicament.",
      where: "Middleware entre les capteurs IoT et le registre central.",
      guarantee: "Assure l'immuabilité totale de la chaîne de froid et de possession.",
      tags: ["Supply Chain", "Traceability", "Merkle"]
    },
    {
      title: "Assurance Paramétrique",
      sector: "finance",
      risk: "Moyen",
      desc: "Exécution automatique des contrats d'assurance basée sur des oracles météo ou sismiques certifiés par Obsidia.",
      where: "Smart Contract Gateway / Oracle Validator.",
      guarantee: "Déclenchement instantané et incontestable des indemnisations.",
      tags: ["Insurtech", "Oracle", "Automation"]
    },
    {
      title: "Dispositifs Médicaux Connectés",
      sector: "health",
      risk: "Critique",
      desc: "Validation formelle (Lean) des règles de dosage pour empêcher toute erreur logicielle d'impacter le patient.",
      where: "Embarqué dans le firmware du dispositif médical.",
      guarantee: "Élimine le risque de surdosage par erreur logicielle ou bug de capteur.",
      tags: ["MedTech", "Lean 4", "Safety"]
    },
    {
      title: "Recherche Clinique (Privacy)",
      sector: "health",
      risk: "Élevé",
      desc: "Gouvernance des accès aux données patients anonymisées pour les algorithmes d'entraînement IA.",
      where: "Data Lake Access Layer.",
      guarantee: "Zéro fuite de données identifiables via des preuves de non-divulgation.",
      tags: ["HealthData", "Privacy", "Governance"]
    },
    // Finance & Fintech
    {
      title: "Validation de Paiements",
      sector: "finance",
      risk: "Critique",
      desc: "Obsidia contrôle les validations proposées par une IA avant qu’un paiement parte réellement.",
      where: "S’intercale entre le moteur de scoring / détection / recommandation et le système de paiement ou d’autorisation.",
      guarantee: "Garantit qu’aucun paiement sensible ne part sans contrôle, traçabilité, preuve et respect des règles.",
      tags: ["Payments", "Fintech", "Security"]
    },
    {
      title: "Octroi de Crédit assisté par IA",
      sector: "finance",
      risk: "Élevé",
      desc: "Obsidia contrôle les recommandations de crédit avant qu’elles deviennent une décision opérationnelle.",
      where: "S’intercale entre le moteur d’évaluation / scoring et le système de décision ou de validation.",
      guarantee: "Garantit qu’aucune décision sensible n’est promue sans règles explicites, historique clair et justification vérifiable.",
      tags: ["Credit", "Lending", "Compliance"]
    },
    {
      title: "Détection de Fraude en Temps Réel",
      sector: "finance",
      risk: "Critique",
      desc: "Obsidia empêche qu’un signal probabiliste devienne une action bloquante sans contrôle gouverné.",
      where: "S’intercale entre le moteur de détection de fraude et le système de blocage, d’escalade ou de validation.",
      guarantee: "Garantit qu’aucune action de blocage ou de refus n’est déclenchée sans preuve, cohérence et traçabilité complète.",
      tags: ["Fraud", "Real-time", "Anti-Money-Laundering"]
    },
    {
      title: "Conformité et Surveillance Réglementaire",
      sector: "finance",
      risk: "Élevé",
      desc: "Obsidia garde une trace gouvernée des décisions sensibles pour faciliter l’audit et la conformité.",
      where: "S’intercale entre les moteurs d’analyse, les workflows conformité et les actions opérationnelles.",
      guarantee: "Garantit auditabilité, justification des décisions, anti-boîte noire et cohérence des sorties avant action.",
      tags: ["RegTech", "Audit", "Transparency"]
    },
    // IA & Agents
    {
      title: "Tool Calling Sécurisé",
      sector: "ai",
      risk: "Critique",
      desc: "Obsidia décide si un agent a le droit d’appeler un outil, d’écrire, de modifier ou de déclencher une action.",
      where: "S’intercale entre la proposition de tool call et l’appel réel à l’outil.",
      guarantee: "Garantit que l’agent ne passe jamais du texte à l’action sans validation, garde-fou et journal de preuve.",
      tags: ["Agentic AI", "Tool-Use", "Safety"]
    },
    {
      title: "Orchestration Multi-Agents",
      sector: "ai",
      risk: "Élevé",
      desc: "Obsidia contrôle les décisions partagées entre plusieurs agents avant qu’elles deviennent des actions réelles.",
      where: "S’intercale entre l’orchestrateur multi-agents et la couche d’exécution ou de coordination.",
      guarantee: "Garantit qu’aucune action collective n’est validée sans cohérence, contrôle de sortie et trace gouvernée.",
      tags: ["Multi-Agent", "Orchestration", "Consensus"]
    },
    {
      title: "Mémoire Long Terme Gouvernée",
      sector: "ai",
      risk: "Critique",
      desc: "Obsidia contrôle ce qu’un agent a le droit de mémoriser, promouvoir ou réutiliser dans le temps.",
      where: "S’intercale entre la mémoire volatile, la mémoire persistante et la logique de promotion d’état.",
      guarantee: "Garantit qu’aucune information sensible ou mal validée ne devient mémoire canonique sans contrôle et preuve.",
      tags: ["Memory", "Knowledge-Graph", "Integrity"]
    },
    {
      title: "Décision IA → Action Métier",
      sector: "ai",
      risk: "Élevé",
      desc: "Obsidia transforme une proposition d’agent en décision gouvernée avant toute exécution métier.",
      where: "S’intercale entre le moteur agentique et les systèmes métiers, API ou workflows aval.",
      guarantee: "Garantit que chaque décision est validée, tracée, horodatée et bloquable avant passage au réel.",
      tags: ["Business-Logic", "Execution", "Governance"]
    },
    // Industrie & IoT
    {
      title: "Maintenance Prédictive Gouvernée",
      sector: "industry",
      risk: "Élevé",
      desc: "Obsidia contrôle les recommandations automatiques avant qu’elles déclenchent une intervention, un arrêt ou une alerte critique.",
      where: "S’intercale entre les moteurs de prédiction, les systèmes de supervision et les workflows d’intervention.",
      guarantee: "Garantit qu’aucune action opérationnelle sensible n’est promue sans validation, contexte et traçabilité.",
      tags: ["Predictive", "Maintenance", "IoT"]
    },
    {
      title: "Commande Machine / Actuateurs",
      sector: "industry",
      risk: "Critique",
      desc: "Obsidia contrôle le passage entre une décision logicielle et une action physique sur machine ou équipement.",
      where: "S’intercale entre le moteur de contrôle, l’automate, le PLC ou la couche d’exécution physique.",
      guarantee: "Garantit qu’aucune commande sensible n’est libérée sans règles, fenêtre de contrôle et preuve d’autorisation.",
      tags: ["Robotics", "PLC", "Hardware-Control"]
    },
    {
      title: "Jumeau Numérique → Action Réelle",
      sector: "industry",
      risk: "Élevé",
      desc: "Obsidia empêche qu’une simulation ou recommandation issue d’un jumeau numérique passe directement au réel sans gouvernance.",
      where: "S’intercale entre le jumeau numérique, les recommandations issues de simulation et les systèmes d’exécution.",
      guarantee: "Garantit qu’aucune action physique ou industrielle ne part sans validation, audit et contrôle de cohérence.",
      tags: ["Digital-Twin", "Simulation", "Industrial-Control"]
    },
    {
      title: "Passage Test → Production",
      sector: "industry",
      risk: "Critique",
      desc: "Obsidia empêche qu’un workflow ou une décision expérimentale passe en production sans validation claire.",
      where: "S’intercale entre la sandbox, le pipeline de validation et la mise en production.",
      guarantee: "Garantit qu’aucun passage au réel ne se fait sans règles, preuve, historique et décision gouvernée.",
      tags: ["DevOps", "Production-Safety", "Deployment"]
    },
    // Santé & Pharma
    {
      title: "Triage Assisté par IA",
      sector: "health",
      risk: "Critique",
      desc: "Obsidia contrôle les recommandations de tri ou de priorisation avant qu’elles influencent une décision sensible.",
      where: "S’intercale entre le moteur de recommandation, l’interface métier et la validation humaine ou système.",
      guarantee: "Garantit qu’aucune recommandation critique n’est promue sans contrôle, justification et traçabilité complète.",
      tags: ["Triage", "Emergency", "Decision-Support"]
    },
    {
      title: "Aide à la Prescription / Recommandation",
      sector: "health",
      risk: "Élevé",
      desc: "Obsidia ajoute une couche de gouvernance avant qu’une recommandation IA n’influence un parcours de soin.",
      where: "S’intercale entre l’IA de recommandation, le système clinique et la décision finale.",
      guarantee: "Garantit qu’aucune recommandation sensible n’est validée sans règles, contexte, audit et contrôle de sortie.",
      tags: ["Clinical", "Pharma", "Prescription"]
    },
    {
      title: "Accès Données de Santé / Partage Contrôlé",
      sector: "health",
      risk: "Critique",
      desc: "Obsidia contrôle les demandes d’accès, de partage ou d’usage de données sensibles avant toute action réelle.",
      where: "S’intercale entre les moteurs d’autorisation, les systèmes de données et les actions de consultation, export ou partage.",
      guarantee: "Garantit qu’aucun accès ou partage sensible n’est libéré sans conformité, preuve et historique vérifiable.",
      tags: ["HealthData", "Privacy", "GDPR"]
    },
    {
      title: "Automatisation Administrative Sensible",
      sector: "health",
      risk: "Élevé",
      desc: "Obsidia gouverne les automatisations de validation, mise à jour ou synchronisation dans les systèmes santé.",
      where: "S’intercale entre les workflows administratifs automatisés et les systèmes métiers ou dossiers sensibles.",
      guarantee: "Garantit qu’aucune action sensible n’est exécutée sans contrôle, traçabilité et cadre gouverné.",
      tags: ["Admin", "Workflow", "Data-Sync"]
    },
    // Cybersécurité
    {
      title: "Réponse Automatisée aux Incidents",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia contrôle les actions automatiques de réponse avant qu’un système ne coupe, bloque ou modifie une infrastructure réelle.",
      where: "S’intercale entre le moteur de détection / SOAR / playbooks et les actions d’exécution sur le SI.",
      guarantee: "Garantit qu’aucune action défensive sensible n’est lancée sans contrôle, preuve, traçabilité et validation gouvernée.",
      tags: ["Cyber", "SOAR", "Incident Response"]
    },
    {
      title: "Gestion des Accès Privilégiés",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia contrôle les demandes d’élévation de privilèges avant qu’elles deviennent des accès réels.",
      where: "S’intercale entre le moteur d’autorisation, la gestion des identités et les systèmes d’accès critiques.",
      guarantee: "Garantit qu’aucun accès sensible n’est accordé sans règles, justification, historique clair et contrôle de conformité.",
      tags: ["IAM", "PAM", "Security"]
    },
    {
      title: "Actions sur Infrastructure Critique",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia gouverne les actions automatiques sur serveurs, réseaux ou bases avant tout impact réel.",
      where: "S’intercale entre les outils d’orchestration, les scripts d’exécution et les environnements critiques.",
      guarantee: "Garantit qu’aucune action destructive, coupure ou modification critique ne passe sans contrôle de sortie et preuve vérifiable.",
      tags: ["Infra", "Critical", "DevOps"]
    },
    {
      title: "Traçabilité des Décisions de Sécurité",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia garde une mémoire vérifiable des décisions de sécurité prises par des moteurs ou agents automatisés.",
      where: "S’intercale au niveau du moteur de décision, du journal d’audit et du point d’exécution.",
      guarantee: "Garantit anti-boîte noire, auditabilité, responsabilité et historique non modifiable discrètement.",
      tags: ["Audit", "Transparency", "Security"]
    },
    // Legal / Compliance
    {
      title: "Validation de Décisions Conformité",
      sector: "legal",
      risk: "Élevé",
      desc: "Obsidia contrôle les décisions proposées par un moteur conformité avant qu’elles deviennent des refus, blocages ou validations.",
      where: "S’intercale entre les moteurs de règles / scoring conformité et les systèmes opérationnels.",
      guarantee: "Garantit qu’aucune décision sensible n’est appliquée sans justification, traçabilité et preuve de conformité.",
      tags: ["Compliance", "RegTech", "Decision"]
    },
    {
      title: "Gouvernance des Règles Internes",
      sector: "legal",
      risk: "Critique",
      desc: "Obsidia impose les règles critiques avant qu’une automatisation ne passe en action réelle.",
      where: "S’intercale entre les politiques internes, les moteurs de décision et les workflows d’exécution.",
      guarantee: "Garantit qu’aucune action hors cadre ne part sans contrôle, journal clair et historique auditable.",
      tags: ["Internal Rules", "Governance", "Policy"]
    },
    {
      title: "Piste d’Audit Vérifiable",
      sector: "legal",
      risk: "Élevé",
      desc: "Obsidia transforme les décisions automatiques en historique lisible, vérifiable et scellable.",
      where: "S’intercale entre le moteur de décision, la couche d’audit et les systèmes métiers.",
      guarantee: "Garantit anti-boîte noire, justification des décisions et possibilité de preuve ex post.",
      tags: ["Audit", "Legal", "Traceability"]
    },
    {
      title: "Contrôle de Promotion en Production",
      sector: "legal",
      risk: "Critique",
      desc: "Obsidia contrôle le passage d’une décision ou règle expérimentale à une règle active appliquée à grande échelle.",
      where: "S’intercale entre les environnements de test, les workflows de validation et les systèmes de production.",
      guarantee: "Garantit qu’aucune règle sensible ne devient active sans validation, horodatage et historique clair.",
      tags: ["Prod", "Validation", "Scale"]
    },
    // Retail / E-commerce
    {
      title: "Validation de Prix Dynamiques",
      sector: "retail",
      risk: "Élevé",
      desc: "Obsidia contrôle les recommandations de prix avant qu’elles ne soient publiées automatiquement.",
      where: "S’intercale entre les moteurs d’optimisation de prix et les systèmes de publication ou catalogue.",
      guarantee: "Garantit qu’aucun changement sensible n’est appliqué sans règles, cohérence, trace et contrôle du risque.",
      tags: ["Pricing", "Retail", "Dynamic"]
    },
    {
      title: "Gouvernance des Promotions",
      sector: "retail",
      risk: "Critique",
      desc: "Obsidia empêche qu’une promotion ou règle commerciale erronée soit poussée en production sans contrôle.",
      where: "S’intercale entre les moteurs de recommandation marketing et les systèmes de mise en ligne.",
      guarantee: "Garantit qu’aucune action commerciale à impact fort ne part sans validation, preuve et possibilité de blocage.",
      tags: ["Marketing", "Promotions", "Retail"]
    },
    {
      title: "Automatisation CRM / Messagerie",
      sector: "retail",
      risk: "Élevé",
      desc: "Obsidia contrôle les déclenchements automatiques avant qu’ils ne touchent des clients ou des canaux externes.",
      where: "S’intercale entre les moteurs CRM, les workflows de campagnes et les outils d’envoi.",
      guarantee: "Garantit qu’aucune action sensible vers le client ne part sans contrôle, cohérence et historique traçable.",
      tags: ["CRM", "Messaging", "Customer"]
    },
    {
      title: "Fraude Commande / Remboursement",
      sector: "retail",
      risk: "Critique",
      desc: "Obsidia gouverne les décisions automatiques de remboursement, refus ou blocage avant action réelle.",
      where: "S’intercale entre les moteurs antifraude, de scoring commande et les actions de remboursement ou refus.",
      guarantee: "Garantit qu’aucune décision sensible n’est promue sans règles explicites, preuve et contrôle de sortie.",
      tags: ["Fraud", "Refund", "E-commerce"]
    },
    // ERP / Back Office
    {
      title: "Validation d’Écritures Automatiques",
      sector: "erp",
      risk: "Élevé",
      desc: "Obsidia contrôle les écritures ou mises à jour proposées par des systèmes automatiques avant qu’elles touchent l’ERP.",
      where: "S’intercale entre les moteurs d’automatisation et les systèmes ERP / comptables.",
      guarantee: "Garantit qu’aucune écriture sensible n’est appliquée sans règles, preuve et historique auditable.",
      tags: ["ERP", "Accounting", "Automation"]
    },
    {
      title: "Synchronisation Inter-Systèmes",
      sector: "erp",
      risk: "Critique",
      desc: "Obsidia contrôle les synchronisations critiques avant qu’elles ne modifient plusieurs systèmes à la fois.",
      where: "S’intercale entre les connecteurs, les bus de données et les systèmes aval.",
      guarantee: "Garantit qu’aucune propagation erronée ne passe sans contrôle, fenêtre de validation et traçabilité native.",
      tags: ["Sync", "Data", "Integrity"]
    },
    {
      title: "Workflows d’Approbation",
      sector: "erp",
      risk: "Élevé",
      desc: "Obsidia ajoute une logique de gouvernance avant qu’une validation automatisée ne devienne une décision métier effective.",
      where: "S’intercale entre les workflows d’approbation, les moteurs de règles et les systèmes opérationnels.",
      guarantee: "Garantit qu’aucune validation sensible ne passe sans contrôle, justification et historique clair.",
      tags: ["Workflow", "Approval", "Back-Office"]
    },
    {
      title: "Modification de Données Maîtresses",
      sector: "erp",
      risk: "Critique",
      desc: "Obsidia contrôle les changements critiques sur données maîtresses avant qu’ils ne deviennent la nouvelle vérité système.",
      where: "S’intercale entre les propositions de modification et la base canonique / référentiel maître.",
      guarantee: "Garantit qu’aucune donnée critique n’est promue sans règles, audit et preuve scellable.",
      tags: ["MDM", "Master Data", "Integrity"]
    },
    // Secteur Public
    {
      title: "Décision Administrative Assistée",
      sector: "public",
      risk: "Élevé",
      desc: "Obsidia contrôle les recommandations automatiques avant qu’elles n’influencent une décision administrative sensible.",
      where: "S’intercale entre les moteurs de recommandation, les workflows d’instruction et la décision finale.",
      guarantee: "Garantit qu’aucune sortie sensible n’est promue sans justification, traçabilité et contrôle gouverné.",
      tags: ["Public", "Admin", "Decision"]
    },
    {
      title: "Attribution / Priorisation Automatisée",
      sector: "public",
      risk: "Critique",
      desc: "Obsidia gouverne les priorisations automatiques avant qu’elles deviennent des choix effectifs dans les systèmes publics.",
      where: "S’intercale entre les moteurs de scoring / priorisation et les systèmes métier d’attribution.",
      guarantee: "Garantit qu’aucune décision d’impact n’est appliquée sans règles explicites, preuve et lisibilité ex post.",
      tags: ["Public", "Allocation", "Priority"]
    },
    {
      title: "Traçabilité de Décisions Publiques",
      sector: "public",
      risk: "Élevé",
      desc: "Obsidia garde une mémoire claire et vérifiable des décisions automatisées dans les environnements sensibles.",
      where: "S’intercale entre le moteur de décision, la couche d’audit et les systèmes de gestion publique.",
      guarantee: "Garantit anti-boîte noire, responsabilité, auditabilité et historique non modifiable discrètement.",
      tags: ["Transparency", "Public", "Audit"]
    },
    {
      title: "Gouvernance de Workflows Sensibles",
      sector: "public",
      risk: "Critique",
      desc: "Obsidia contrôle les workflows publics automatisés avant qu’ils ne déclenchent des actions réelles sur dossiers, données ou services.",
      where: "S’intercale entre les moteurs d’automatisation, les agents et les systèmes d’exécution administratifs.",
      guarantee: "Garantit qu’aucune action sensible n’est exécutée sans validation, contrôle du risque et preuve gouvernée.",
      tags: ["Workflow", "Public", "Safety"]
    },
    // Vague 3
    {
      title: "Régulation de Production Énergétique",
      sector: "energy",
      risk: "Critique",
      desc: "Obsidia contrôle les commandes de modulation de charge sur les centrales de production pour éviter les instabilités de fréquence.",
      where: "S'intercale entre le SCADA et les contrôleurs de turbine.",
      guarantee: "Garantit le maintien de la stabilité du réseau national.",
      tags: ["Energy", "Grid", "Safety"]
    },
    {
      title: "Validation de Cibles Stratégiques",
      sector: "defense",
      risk: "Critique",
      desc: "Obsidia vérifie la conformité des propositions de ciblage algorithmique avec les bases de données de zones protégées.",
      where: "S'intercale entre le moteur d'analyse d'image et le système de désignation.",
      guarantee: "Garantit le respect des zones d'exclusion et des traités internationaux.",
      tags: ["Defense", "Compliance", "Targeting"]
    },
    {
      title: "Optimisation de Stock Automatisée",
      sector: "supply",
      risk: "Moyen",
      desc: "Obsidia contrôle les commandes de réapprovisionnement massives générées par IA pour éviter les ruptures de trésorerie ou le surstockage.",
      where: "S'intercale entre l'ERP et le portail fournisseur.",
      guarantee: "Garantit le respect des limites budgétaires et des capacités de stockage.",
      tags: ["Supply Chain", "Inventory", "ERP"]
    },
    {
      title: "Gestion des Sinistres Complexes",
      sector: "insurance",
      risk: "Élevé",
      desc: "Obsidia contrôle les propositions de clôture de dossiers sinistres par IA pour garantir l'équité et le respect des clauses contractuelles.",
      where: "S'intercale entre le moteur de traitement de sinistres et le système de paiement.",
      guarantee: "Garantit une indemnisation juste et auditable.",
      tags: ["Insurance", "Claims", "Compliance"]
    },
    {
      title: "Analyse Génomique Sécurisée",
      sector: "health",
      risk: "Élevé",
      desc: "Obsidia gouverne l'accès aux séquences génomiques brutes lors des analyses par agents IA pour prévenir toute ré-identification.",
      where: "S'intercale entre la base de données génomique et l'environnement de calcul.",
      guarantee: "Garantit l'anonymat génétique total des patients.",
      tags: ["Genomics", "Health", "Privacy"]
    },
    // Énergie (Vague 4)
    {
      title: "Pilotage de Réseaux Locaux",
      sector: "energy",
      risk: "Critique",
      desc: "Obsidia contrôle les décisions automatiques avant qu’elles ne modifient l’équilibre d’un réseau énergétique local.",
      where: "S’intercale entre le moteur d’optimisation énergétique et les systèmes de pilotage ou de dispatch.",
      guarantee: "Garantit qu’aucune action sensible sur le réseau n’est déclenchée sans contrôle, traçabilité et validation gouvernée.",
      tags: ["Smart-Grid", "Microgrid", "Dispatch"]
    },
    {
      title: "Gestion de Flexibilité Énergétique",
      sector: "energy",
      risk: "Élevé",
      desc: "Obsidia gouverne les arbitrages automatiques avant qu’ils ne deviennent des actions réelles sur consommation, stockage ou effacement.",
      where: "S’intercale entre les moteurs de flexibilité, les signaux marché et les systèmes d’exécution.",
      guarantee: "Garantit qu’aucune consigne sensible n’est appliquée sans règles, preuve et contrôle du bon moment.",
      tags: ["Flexibility", "Demand-Response", "Market"]
    },
    {
      title: "Commande de Stockage / Batteries",
      sector: "energy",
      risk: "Critique",
      desc: "Obsidia contrôle les ordres automatiques avant qu’ils n’affectent charge, décharge ou sécurité des systèmes de stockage.",
      where: "S’intercale entre les moteurs de pilotage, les BMS et les couches d’exécution.",
      guarantee: "Garantit qu’aucune commande sensible n’est libérée sans validation, audit et cohérence opérationnelle.",
      tags: ["Storage", "BMS", "Battery"]
    },
    {
      title: "Alerte et Escalade Incidents Énergétiques",
      sector: "energy",
      risk: "Élevé",
      desc: "Obsidia gouverne les décisions d’alerte, d’escalade ou de coupure avant qu’elles ne déclenchent un impact réel.",
      where: "S’intercale entre les moteurs de détection, la supervision et les workflows d’intervention.",
      guarantee: "Garantit qu’aucune action de réaction sensible n’est exécutée sans preuve, contrôle et traçabilité complète.",
      tags: ["Incident", "Safety", "Alert"]
    },
    // Défense (Vague 4)
    {
      title: "Fusion de Signaux et Aide à la Décision",
      sector: "defense",
      risk: "Critique",
      desc: "Obsidia contrôle les recommandations issues de multiples capteurs avant qu’elles n’influencent une décision critique.",
      where: "S’intercale entre les moteurs de fusion, les systèmes d’aide à la décision et la couche d’exécution.",
      guarantee: "Garantit qu’aucune recommandation sensible n’est promue sans contrôle, justification et historique vérifiable.",
      tags: ["Sensor-Fusion", "Decision-Support", "Intelligence"]
    },
    {
      title: "Gouvernance de Systèmes Autonomes Non Robotiques",
      sector: "defense",
      risk: "Élevé",
      desc: "Obsidia contrôle les décisions automatiques avant qu’elles ne deviennent des actions système à fort impact.",
      where: "S’intercale entre les moteurs autonomes, les modules de mission et les systèmes d’exécution.",
      guarantee: "Garantit qu’aucune action sensible n’est libérée sans règles explicites, trace et validation gouvernée.",
      tags: ["Autonomous", "Mission-Control", "Safety"]
    },
    {
      title: "Priorisation de Menaces",
      sector: "defense",
      risk: "Critique",
      desc: "Obsidia gouverne les classements automatiques de menaces avant qu’ils ne déclenchent des réponses ou arbitrages critiques.",
      where: "S’intercale entre les moteurs de scoring / détection et les systèmes de réponse ou d’alerte.",
      guarantee: "Garantit qu’aucune priorisation sensible ne devient action sans contrôle, preuve et anti-boîte noire.",
      tags: ["Threat-Assessment", "Scoring", "Defense"]
    },
    {
      title: "Traçabilité des Décisions Opérationnelles",
      sector: "defense",
      risk: "Élevé",
      desc: "Obsidia garde une mémoire vérifiable des décisions sensibles prises par des systèmes automatisés ou assistés.",
      where: "S’intercale entre les moteurs de décision, la couche d’audit et les systèmes opérationnels.",
      guarantee: "Garantit responsabilité, auditabilité, justification ex post et historique non modifiable discrètement.",
      tags: ["Audit", "Transparency", "Defense"]
    },
    // Supply Chain (Vague 4)
    {
      title: "Orchestration de Flux Multi-Sites",
      sector: "supply",
      risk: "Élevé",
      desc: "Obsidia contrôle les arbitrages automatiques avant qu’ils ne modifient des flux physiques ou des priorités de distribution.",
      where: "S’intercale entre les moteurs d’orchestration logistique et les systèmes de planification / exécution.",
      guarantee: "Garantit qu’aucune décision sensible sur les flux n’est appliquée sans contrôle, cohérence et trace claire.",
      tags: ["Logistics", "Orchestration", "Multi-site"]
    },
    {
      title: "Réaffectation Automatique de Stocks",
      sector: "supply",
      risk: "Critique",
      desc: "Obsidia gouverne les décisions de transfert ou réaffectation avant impact réel sur la chaîne de distribution.",
      where: "S’intercale entre les moteurs de recommandation stock et les systèmes ERP / WMS / TMS.",
      guarantee: "Garantit qu’aucune réaffectation critique n’est exécutée sans validation, preuve et historique auditable.",
      tags: ["Inventory", "Stock-Transfer", "ERP"]
    },
    {
      title: "Priorisation de Livraisons",
      sector: "supply",
      risk: "Élevé",
      desc: "Obsidia contrôle les choix automatiques de priorité avant qu’ils ne deviennent des arbitrages opérationnels effectifs.",
      where: "S’intercale entre les moteurs de scoring, les systèmes de dispatch et les workflows d’exécution.",
      guarantee: "Garantit qu’aucune priorité sensible n’est promue sans règles explicites, contrôle et traçabilité.",
      tags: ["Delivery", "Priority", "Dispatch"]
    },
    {
      title: "Décision de Rupture / Substitution",
      sector: "supply",
      risk: "Critique",
      desc: "Obsidia gouverne les décisions automatiques en situation de rupture avant qu’elles ne modifient la chaîne d’approvisionnement réelle.",
      where: "S’intercale entre les moteurs de simulation / recommandation et les systèmes d’achat ou de replanification.",
      guarantee: "Garantit qu’aucune décision d’impact sur la supply chain n’est prise sans validation, audit et preuve de conformité.",
      tags: ["Supply-Chain", "Risk-Management", "Substitution"]
    },
    // Assurance (Vague 4)
    {
      title: "Tri de Sinistres Assisté par IA",
      sector: "insurance",
      risk: "Élevé",
      desc: "Obsidia contrôle les recommandations automatiques avant qu’elles n’orientent, accélèrent ou bloquent un traitement de sinistre.",
      where: "S’intercale entre les moteurs de tri / scoring et les systèmes de gestion des sinistres.",
      guarantee: "Garantit qu’aucune décision sensible n’est promue sans règles, traçabilité et justification vérifiable.",
      tags: ["Claims", "AI-Sorting", "Insurance"]
    },
    {
      title: "Décision de Remboursement",
      sector: "insurance",
      risk: "Critique",
      desc: "Obsidia gouverne les propositions de remboursement avant qu’elles ne deviennent une décision opérationnelle réelle.",
      where: "S’intercale entre les moteurs d’aide à la décision, les workflows assurance et les systèmes de paiement ou validation.",
      guarantee: "Garantit qu’aucun remboursement sensible n’est libéré sans contrôle, preuve et cohérence de sortie.",
      tags: ["Refund", "Payment", "Insurance"]
    },
    {
      title: "Fraude et Détection d’Anomalies",
      sector: "insurance",
      risk: "Élevé",
      desc: "Obsidia empêche qu’un signal probabiliste devienne automatiquement une décision bloquante sans gouvernance.",
      where: "S’intercale entre les moteurs antifraude / anomalies et les actions de rejet, blocage ou escalade.",
      guarantee: "Garantit qu’aucune action sensible contre un dossier ou un assuré n’est appliquée sans contrôle, audit et historique clair.",
      tags: ["Fraud-Detection", "Anomalies", "Insurance"]
    },
    {
      title: "Tarification et Décision Contractuelle",
      sector: "insurance",
      risk: "Critique",
      desc: "Obsidia contrôle les recommandations de tarification avant qu’elles n’affectent directement une proposition ou un contrat.",
      where: "S’intercale entre les moteurs de tarification / scoring et les systèmes de souscription ou de contractualisation.",
      guarantee: "Garantit qu’aucune décision à fort impact économique n’est promue sans validation, preuve et traçabilité native.",
      tags: ["Pricing", "Underwriting", "Contract"]
    },
    // Santé & Pharma (Vague 4)
    {
      title: "Aide au Diagnostic Imagerie",
      sector: "health",
      risk: "Critique",
      desc: "Obsidia contrôle les recommandations issues d’IA d’imagerie avant qu’elles n’influencent une décision sensible.",
      where: "S’intercale entre le moteur d’analyse d’images, l’interface clinique et la décision finale.",
      guarantee: "Garantit qu’aucune recommandation critique n’est promue sans contrôle, justification et trace vérifiable.",
      tags: ["Imaging", "Diagnostics", "Health"]
    },
    {
      title: "Pharmacovigilance Assistée",
      sector: "health",
      risk: "Élevé",
      desc: "Obsidia gouverne les alertes et priorisations automatiques avant qu’elles ne déclenchent une action sensible.",
      where: "S’intercale entre les moteurs de détection de signaux, les workflows pharmacovigilance et les systèmes d’intervention.",
      guarantee: "Garantit qu’aucune alerte critique n’est promue sans preuve, cohérence et traçabilité complète.",
      tags: ["Pharmacovigilance", "Safety", "Pharma"]
    },
    {
      title: "Planification de Ressources Cliniques",
      sector: "health",
      risk: "Critique",
      desc: "Obsidia contrôle les arbitrages automatiques avant qu’ils n’impactent des ressources ou parcours de soin sensibles.",
      where: "S’intercale entre les moteurs de planification, les systèmes hospitaliers et les workflows opérationnels.",
      guarantee: "Garantit qu’aucune décision sensible sur l’allocation de ressources n’est exécutée sans validation, règles et historique auditable.",
      tags: ["Resource-Planning", "Clinical", "Hospital"]
    },
    {
      title: "Gouvernance des Alertes Cliniques",
      sector: "health",
      risk: "Élevé",
      desc: "Obsidia contrôle les alertes générées automatiquement avant qu’elles n’influencent une décision humaine ou système.",
      where: "S’intercale entre les moteurs de surveillance, les interfaces métiers et les systèmes de décision.",
      guarantee: "Garantit qu’aucune alerte sensible n’est poussée sans contrôle, lisibilité de la décision et possibilité de replay.",
      tags: ["Alerts", "Monitoring", "Clinical"]
    },
    // Cybersécurité (Vague 4 - Suite)
    {
      title: "Isolation Automatique de Machines",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia contrôle l’ordre d’isolement avant qu’un système ne coupe automatiquement une machine, un poste ou un serveur.",
      where: "S’intercale entre le moteur de détection / EDR / XDR et la couche d’exécution réseau ou poste.",
      guarantee: "Garantit qu’aucune isolation sensible n’est déclenchée sans contrôle, justification, horodatage et historique vérifiable.",
      tags: ["EDR", "Isolation", "Cyber"]
    },
    {
      title: "Blocage de Comptes et Sessions",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia gouverne les décisions automatiques de blocage de comptes, sessions ou accès avant qu’elles ne deviennent effectives.",
      where: "S’intercale entre les moteurs d’anomalie / IAM / SIEM et les systèmes d’authentification ou de coupure de session.",
      guarantee: "Garantit qu’aucun blocage sensible n’est appliqué sans règles explicites, preuve et capacité de relecture de la décision.",
      tags: ["IAM", "Session-Control", "Cyber"]
    },
    {
      title: "Quarantaine de Fichiers ou Flux",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia contrôle les mises en quarantaine automatiques avant qu’elles ne bloquent des flux, documents ou objets critiques.",
      where: "S’intercale entre les moteurs d’analyse, sandbox, antivirus ou détection et les systèmes de quarantaine.",
      guarantee: "Garantit qu’aucune mise en quarantaine à fort impact ne part sans validation, traçabilité et contrôle du risque de faux positif.",
      tags: ["Quarantine", "Malware", "Cyber"]
    },
    {
      title: "Ouverture / Fermeture de Droits d’Accès",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia contrôle les décisions automatiques qui ouvrent, ferment ou modifient des droits sur des ressources sensibles.",
      where: "S’intercale entre les moteurs de politiques, IAM/PAM et les systèmes cibles.",
      guarantee: "Garantit qu’aucune modification sensible des droits n’est promue sans contrôle, historique clair et preuve d’autorisation.",
      tags: ["Access-Rights", "IAM", "Cyber"]
    },
    {
      title: "Règles de Firewall / Segmentation",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia gouverne les changements automatiques de règles réseau avant qu’ils n’impactent la circulation réelle des flux.",
      where: "S’intercale entre les moteurs d’orchestration sécurité, les politiques réseau et les équipements de filtrage.",
      guarantee: "Garantit qu’aucune règle critique n’est appliquée sans validation, audit et possibilité de justification ex post.",
      tags: ["Firewall", "Segmentation", "Network"]
    },
    {
      title: "Priorisation d’Alertes SOC",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia contrôle les priorisations automatiques avant qu’elles ne deviennent des escalades ou des décisions opérateur.",
      where: "S’intercale entre les moteurs de scoring / corrélation et les workflows SOC.",
      guarantee: "Garantit qu’aucune alerte sensible n’est promue sans cohérence, trace claire et logique de décision gouvernée.",
      tags: ["SOC", "Alert-Priority", "Cyber"]
    },
    {
      title: "Playbooks SOAR Gouvernés",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia empêche qu’un playbook automatisé déclenche directement une chaîne d’actions irréversibles sans garde-fou.",
      where: "S’intercale entre le moteur SOAR, les playbooks et la couche d’exécution réelle.",
      guarantee: "Garantit qu’aucune chaîne d’actions sensible n’est lancée sans validation, fenêtre de contrôle et historique scellable.",
      tags: ["SOAR", "Playbook", "Automation"]
    },
    {
      title: "Anti Boîte Noire pour IA de Sécurité",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia évite qu’une IA de cybersécurité décide dans le noir en gardant la raison, le moment, la sortie et la preuve.",
      where: "S’intercale entre les moteurs IA de détection / recommandation et les décisions opérées sur le SI.",
      guarantee: "Garantit lisibilité, auditabilité, responsabilité et preuve vérifiable sur les décisions sensibles.",
      tags: ["AI-Security", "Transparency", "Cyber"]
    },
    {
      title: "Validation d’Actions de Remédiation",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia contrôle les actions de remédiation proposées automatiquement avant qu’elles ne modifient systèmes, accès ou configurations.",
      where: "S’intercale entre les moteurs de remédiation et les systèmes d’exécution technique.",
      guarantee: "Garantit qu’aucune remédiation critique ne part sans règles, validation, traçabilité et contrôle du moment opportun.",
      tags: ["Remediation", "Cyber", "Automation"]
    },
    {
      title: "Gouvernance des Preuves et Journaux",
      sector: "cyber",
      risk: "Élevé",
      desc: "Obsidia transforme les décisions automatisées de cybersécurité en historique clair, vérifiable et difficile à altérer.",
      where: "S’intercale entre les moteurs de décision, les journaux d’événements et la couche d’audit.",
      guarantee: "Garantit preuve, intégrité, anti-altération discrète et continuité de lecture des décisions prises.",
      tags: ["Logs", "Audit", "Integrity"]
    },
    {
      id: "incidents",
      title: "Décision d’Escalade ou de Coupure",
      sector: "cyber",
      risk: "Critique",
      desc: "Obsidia contrôle les décisions critiques d’escalade, de coupure ou de confinement avant qu’elles n’aient un impact réel.",
      where: "S’intercale entre les moteurs de scoring / détection / corrélation et les systèmes d’action sécurité.",
      guarantee: "Garantit qu’aucune décision à fort impact n’est exécutée sans contrôle, justification, traçabilité et gouvernance explicite.",
      tags: ["Escalation", "Cyber", "Decision"]
    }
  ];

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesFilter = filter === "all" || c.sector === filter;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const displayedCases = filteredCases.slice(0, visibleCount);

  const handleFilterChange = (id: string) => {
    setFilter(id);
    setVisibleCount(6);
    setSearchQuery("");
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const nextSimStep = () => {
    if (simulationStep < 2) setSimulationStep(prev => prev + 1);
    else setSimulationStep(0);
  };

  return (
    <div className="pt-32 pb-24 bg-obsidia-bg text-obsidia-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-[1px] bg-obsidia-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent">Applications Réelles & Scénarios</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-[0.9]">
            Cas <br />
            <span className="text-obsidia-accent">Concrets</span>.
          </h1>
          <p className="text-xl md:text-2xl text-obsidia-ink/60 leading-relaxed font-light max-w-2xl">
            Obsidia est un noyau horizontal. Il s'applique partout où une action logicielle doit être <span className="text-obsidia-ink font-medium italic">gouvernée, sécurisée et prouvée</span> mathématiquement.
          </p>
        </div>

        {/* NARRATIVE BLOCK */}
        <div className="my-32 p-10 bg-obsidia-ink border-l-4 border-obsidia-accent rounded-r-sm shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidia-accent-muted mb-4">
            LA GARANTIE DU DÉTERMINISME
          </div>
          <p className="text-obsidia-bg/90 leading-[1.7] text-lg italic">
            Chaque cas présenté ici n'est pas une simulation théorique, mais l'application d'une règle immuable. Que ce soit pour la DeFi ou la Trésorerie, Obsidia impose le même standard : l'action ne peut pas dévier de l'intention prouvée. C'est ce que nous appelons la Garantie du Noyau.
          </p>
        </div>

        {/* Filterable Library - Optimized for circulation */}
        <section id="case-library" className="mb-32">
          <div className="flex flex-col mb-16 gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">Bibliothèque de Cas</h2>
                <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Exploration par secteur et recherche libre.</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidia-ink/30" />
                <input 
                  type="text"
                  placeholder="Rechercher un cas, un tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-obsidia-blue/5 border border-obsidia-line pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest focus:border-obsidia-accent outline-none transition-colors"
                />
              </div>
            </div>

            {/* Horizontal Scroll Categories */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`whitespace-nowrap px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${filter === cat.id ? "bg-obsidia-accent border-obsidia-accent text-obsidia-bg" : "border-obsidia-line text-obsidia-ink/40 hover:border-obsidia-accent/30"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {displayedCases.map((c) => (
                <motion.div
                  key={c.id || c.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => toggleExpand(c.id || c.title)}
                  className={`bg-obsidia-blue/5 border border-obsidia-line p-8 group hover:border-obsidia-accent/50 transition-all relative overflow-hidden cursor-pointer ${expandedId === (c.id || c.title) ? 'ring-1 ring-obsidia-accent' : ''}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${c.risk === 'Critique' ? 'border-red-500 text-red-500' : 'border-obsidia-accent text-obsidia-accent'}`}>
                      {c.risk}
                    </div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-obsidia-ink/30">{c.sector}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight italic group-hover:text-obsidia-accent transition-colors leading-tight">{c.title}</h3>
                  
                  <AnimatePresence>
                    {expandedId === (c.id || c.title) ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-obsidia-ink/60 leading-relaxed mb-6 italic">"{c.desc}"</p>
                        
                        <div className="space-y-4 mb-6">
                          <div className="pl-3 border-l border-obsidia-accent/30">
                            <div className="text-[8px] uppercase tracking-widest text-obsidia-accent font-bold mb-1">Où on se branche</div>
                            <p className="text-xs font-medium">{c.where}</p>
                          </div>
                          <div className="pl-3 border-l border-emerald-500/30">
                            <div className="text-[8px] uppercase tracking-widest text-emerald-500 font-bold mb-1">Ce qu'on garantit</div>
                            <p className="text-xs opacity-70">{c.guarantee}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {c.tags.map(tag => (
                            <span key={tag} className="text-[7px] font-bold uppercase tracking-widest text-obsidia-ink/40 bg-obsidia-ink/5 px-2 py-1 border border-obsidia-line">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-obsidia-accent/60">
                        Voir détails <ChevronDown className="w-3 h-3" />
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center">
            {visibleCount < filteredCases.length ? (
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-12 py-5 border border-obsidia-ink/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-[10px] font-bold flex items-center gap-4 group"
              >
                Voir plus de cas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : filteredCases.length > 6 ? (
              <button 
                onClick={() => {
                  setVisibleCount(6);
                  window.scrollTo({ 
                    top: document.getElementById('case-library')?.offsetTop ? document.getElementById('case-library')!.offsetTop - 100 : 0, 
                    behavior: 'smooth' 
                  });
                }}
                className="px-12 py-5 border border-obsidia-ink/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-[10px] font-bold flex items-center gap-4 group"
              >
                Voir moins <ArrowRight className="w-4 h-4 -rotate-90 group-hover:-translate-y-1 transition-transform" />
              </button>
            ) : null}
          </div>
        </section>

        {/* Real-time Governance Simulator (Professional Version) */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">Gouvernance en Temps Réel</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Trace d'audit d'une décision déterministe.</p>
          </div>

          <div className="bg-obsidia-ink text-obsidia-bg rounded-3xl overflow-hidden border border-obsidia-accent/20 shadow-2xl">
            <div className="grid lg:grid-cols-4 h-full min-h-[500px]">
              {/* Sidebar: Scenarios */}
              <div className="border-r border-obsidia-bg/10 p-8 bg-obsidia-bg/5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-obsidia-accent mb-8">Flux Interceptés</div>
                <div className="space-y-4">
                  {scenarios.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveScenario(idx); setSimulationStep(0); }}
                      className={`w-full p-4 border text-left transition-all ${activeScenario === idx ? "border-obsidia-accent bg-obsidia-accent/10" : "border-obsidia-bg/10 hover:border-obsidia-accent/30"}`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-tight mb-1">{s.title}</div>
                      <div className="text-[8px] opacity-40 uppercase tracking-widest">{s.sector}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main: Audit Trace */}
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Obsidia Kernel v1.0.4 - Live Trace</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`w-12 h-1 transition-all duration-500 ${simulationStep >= i ? "bg-obsidia-accent" : "bg-obsidia-bg/10"}`} />
                    ))}
                  </div>
                </div>

                <div className="flex-grow grid md:grid-cols-2 gap-12 items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeScenario}-${simulationStep}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      {simulationStep === 0 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-obsidia-accent">
                            <Terminal className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Intention Interceptée</span>
                          </div>
                          <div className="p-6 bg-obsidia-bg/5 border border-obsidia-bg/10 font-mono text-sm leading-relaxed italic">
                            {scenarios[activeScenario].proposition}
                          </div>
                          <div className="text-xs text-obsidia-bg/40 italic">
                            Point d'entrée : {scenarios[activeScenario].technicalPoint}
                          </div>
                        </div>
                      )}

                      {simulationStep === 1 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-emerald-500">
                            <Cpu className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Vérification des Invariants</span>
                          </div>
                          <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 text-lg font-medium leading-relaxed italic">
                            {scenarios[activeScenario].obsidiaRole}
                          </div>
                          <div className="flex gap-4">
                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-widest border border-emerald-500/20">
                              Merkle Proof Generated
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-widest border border-emerald-500/20">
                              Deterministic Pass
                            </div>
                          </div>
                        </div>
                      )}

                      {simulationStep === 2 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-obsidia-bg">
                            <Activity className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Décision Finale</span>
                          </div>
                          <div className={`p-8 border-2 ${scenarios[activeScenario].status === 'BLOCK' ? 'border-red-500 bg-red-500/10 text-red-500' : scenarios[activeScenario].status === 'HOLD' ? 'border-obsidia-accent bg-obsidia-accent/10 text-obsidia-accent' : 'border-emerald-500 bg-emerald-500/10 text-emerald-500'}`}>
                            <div className="flex items-center gap-4 mb-4">
                              {scenarios[activeScenario].status === 'BLOCK' ? <XCircle className="w-8 h-8" /> : scenarios[activeScenario].status === 'HOLD' ? <Clock className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                              <span className="text-4xl font-bold italic uppercase tracking-tighter">{scenarios[activeScenario].status}</span>
                            </div>
                            <div className="text-lg italic leading-relaxed">"{scenarios[activeScenario].outcome}"</div>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono opacity-40">
                            <History className="w-3 h-3" /> Audit Hash: 0x{Math.random().toString(16).slice(2, 14)}...
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Visual Kernel Pulse */}
                  <div className="hidden md:flex justify-center items-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full border border-obsidia-accent/20 animate-ping absolute inset-0"></div>
                      <div className="w-48 h-48 rounded-full border border-obsidia-accent/40 animate-pulse absolute inset-0"></div>
                      <div className="w-48 h-48 rounded-full bg-obsidia-bg/5 flex items-center justify-center relative z-10 border border-obsidia-accent/60">
                        <ShieldCheck className="w-16 h-16 text-obsidia-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center">
                  <button 
                    onClick={nextSimStep}
                    className="px-10 py-4 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center gap-4 group"
                  >
                    {simulationStep === 2 ? "Réinitialiser" : "Étape Suivante"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="text-[10px] font-mono opacity-20 hidden sm:block">
                    SECURED_BY_OBSIDIA_PROTOCOL_V1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Templates (Professional Version) */}
        <section className="mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight italic mb-2">Modèles de Gouvernance</h2>
            <p className="text-sm text-obsidia-ink/40 uppercase tracking-widest">Modules de sécurité pré-configurés pour vos flux.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governanceTemplates.map((template) => (
              <div key={template.id} className="p-8 border border-obsidia-line bg-obsidia-blue/5 hover:border-obsidia-accent/40 transition-all group flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-obsidia-accent mb-4">{template.name}</div>
                  <p className="text-sm text-obsidia-ink/60 mb-6 italic leading-relaxed">"{template.desc}"</p>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-obsidia-ink text-obsidia-bg font-mono text-[10px] border-l-2 border-obsidia-accent">
                    Invariant: {template.invariant}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.metrics.map(m => (
                      <span key={m} className="text-[8px] font-bold uppercase tracking-widest text-obsidia-ink/40 border border-obsidia-line px-2 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href={`${CONFIG.GITHUB_REPO}/tree/main/examples`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-obsidia-accent hover:underline inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
            >
              <Github className="w-4 h-4" /> Exécuter les pipelines de test (Python) <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Impact Section - Problem/Solution Style */}
        <div className="mb-32 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="p-12 bg-obsidia-ink text-obsidia-bg rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight">Le Risque de l'Exécution Aveugle</h2>
              <p className="text-obsidia-bg/60 leading-relaxed mb-8">
                Dans un monde automatisé, l'absence de middleware de contrôle signifie que chaque erreur système ou humaine se propage instantanément au monde réel, sans filtre.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic">Pertes financières massives en millisecondes.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm italic">Responsabilité juridique engagée sur des actions d'IA.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-12 border-2 border-obsidia-accent/20 rounded-3xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold italic mb-6 uppercase tracking-tight text-obsidia-accent">La Garantie du Déterminisme</h2>
              <p className="text-obsidia-ink/60 leading-relaxed mb-8">
                Obsidia verrouille l'exécution. Nous imposons des <span className="text-obsidia-ink font-bold italic">invariants critiques</span> qui ne peuvent être violés, peu importe la puissance de l'attaquant ou l'erreur du système.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Neutralisation des erreurs fatales à la source.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                  <p className="text-sm font-medium">Preuve mathématique d'intégrité opérationnelle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-obsidia-ink text-obsidia-bg p-16 md:p-24 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic tracking-tighter uppercase">Votre cas d'usage est <span className="text-obsidia-accent">unique</span>.</h2>
            <p className="text-xl opacity-60 mb-12 max-w-2xl mx-auto font-light">
              Nos architectes de sécurité analysent vos flux pour concevoir les invariants déterministes adaptés à votre infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-5 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-4">
                Soumettre un scénario <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-12 py-5 border border-obsidia-bg/20 hover:border-obsidia-accent transition-colors uppercase tracking-widest text-sm font-bold">
                Consulter la FAQ technique
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasConcrets;
