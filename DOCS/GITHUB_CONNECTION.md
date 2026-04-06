# Connexion entre l'App et le Dépôt GitHub

L'application Obsidia et le dépôt GitHub `obsidia-x108-proofs` forment un écosystème complet de sécurité déterministe.

## 1. L'App : L'Interface Interactive
L'application (React/Vite) est la **vitrine interactive** et l'interface de contrôle. Elle permet de :
*   Visualiser les métriques de stabilité (Sigma).
*   Simuler des attaques pour tester la résilience.
*   Surveiller le délai X-108 en temps réel.

## 2. Le GitHub : Le Cœur de Preuve
Le dépôt GitHub contient la **preuve mathématique** et le moteur de calcul. Il héberge :
*   **Lean 4 (`/lean`) :** Les preuves formelles garantissant que le code critique ne peut pas bugger.
*   **Sigma Engine (`/sigma`) :** Le code Python (`sigma_monitor.py`) qui effectue les calculs de stabilité affichés sur l'App.
*   **Merkle Scripts (`/scripts`) :** Les outils de vérification d'intégrité (`verify_merkle.py`).

## 3. Synchronisation
L'application est configurée pour pointer vers les ressources spécifiques du dépôt GitHub via la constante `CONFIG.GITHUB_REPO`. 
*   Chaque section technique de l'App renvoie vers le fichier source correspondant sur GitHub.
*   Le statut "Live" de l'App indique si elle communique avec une instance active du moteur Sigma.

---
*L'App montre la sécurité, le GitHub la prouve.*

🔗 **Accéder à l'App :** [https://ais-dev-eflc7fh363ofplr7vj5kfa-422332693421.europe-west2.run.app](https://ais-dev-eflc7fh363ofplr7vj5kfa-422332693421.europe-west2.run.app)
