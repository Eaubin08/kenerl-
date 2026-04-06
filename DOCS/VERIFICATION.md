# Guide de Vérification Locale : Obsidia X-108

Ce guide explique comment cloner le dépôt GitHub et exécuter les scripts de vérification pour prouver la sécurité d'Obsidia sans passer par l'application interactive.

## Prérequis
*   Python 3.8+
*   Git
*   Lean 4 (Optionnel, pour les preuves formelles)

## 1. Cloner le Dépôt
```bash
git clone https://github.com/Eaubin08/obsidia-x108-proofs.git
cd obsidia-x108-proofs
```

## 2. Vérification de la Stabilité Sigma
Le script `sigma_monitor.py` simule le moteur de stabilité. Il calcule l'écart-type des transactions pour détecter les anomalies.

```bash
python3 sigma/sigma_monitor.py
```
*   **Résultat attendu :** Le script affiche les métriques de "vibration" et confirme si le système est stable ou s'il doit se verrouiller.

## 3. Vérification de l'Intégrité Merkle
Le script `verify_merkle.py` permet de prouver que l'état du système n'a pas été altéré.

```bash
python3 scripts/verify_merkle.py --root 0x7f8e...a2b1
```
*   **Résultat attendu :** Le script recalcule la racine de Merkle et confirme la validité du sceau cryptographique.

## 4. Audit des Preuves Lean 4
Si vous avez installé Lean 4, vous pouvez vérifier les théorèmes de sécurité.

```bash
cd lean
lake build
```
*   **Résultat attendu :** Lean 4 compile les fichiers `.lean` et confirme mathématiquement que les invariants critiques sont respectés.

---
*La confiance est un risque. La preuve est une certitude.*

🔗 **Accéder à l'App :** [https://ais-dev-eflc7fh363ofplr7vj5kfa-422332693421.europe-west2.run.app](https://ais-dev-eflc7fh363ofplr7vj5kfa-422332693421.europe-west2.run.app)
