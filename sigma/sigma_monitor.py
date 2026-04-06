import random
import time
import json
import os

class SigmaEngine:
    """
    Sigma Engine: Behavioral Stability Monitor.
    Detects anomalies in system trajectory using variance analysis.
    """
    def __init__(self, threshold=80.0, history_file="sigma/history.json"):
        self.threshold = threshold
        self.history_file = history_file
        self.history = self._load_history()
        self.is_locked = False

    def _load_history(self):
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r') as f:
                    return json.load(f)
            except:
                return []
        return []

    def _save_history(self):
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.history_file), exist_ok=True)
        with open(self.history_file, 'w') as f:
            json.dump(self.history, f, indent=2)

    def analyze(self, stability_metric: float):
        entry = {
            "timestamp": time.time(),
            "stability": stability_metric,
            "status": "NOMINAL" if stability_metric >= self.threshold else "LOCKED"
        }
        self.history.append(entry)
        
        # Keep last 100 entries in history file
        if len(self.history) > 100:
            self.history.pop(0)
            
        self._save_history()

        if stability_metric < self.threshold:
            self.is_locked = True
            return False
        return True

    def get_status(self):
        return "LOCKED" if self.is_locked else "NOMINAL"

if __name__ == "__main__":
    engine = SigmaEngine()
    print("--- Obsidia Sigma Engine Monitoring & Persistence ---")
    print(f"History loaded: {len(engine.history)} entries")
    
    # Simulate 5 new cycles
    for i in range(1, 6):
        stability = 95.0 + random.uniform(0, 4.0)
        is_safe = engine.analyze(stability)
        print(f"Cycle {i:02d}: Stability={stability:.2f}% | Status={engine.get_status()}")
        time.sleep(0.1)

    print(f"\n[SUCCESS] Data persisted to {engine.history_file}")
