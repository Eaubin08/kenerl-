import hashlib
import json
from typing import List, Optional

class MerkleTree:
    """
    Obsidia Merkle Tree Implementation for System Integrity Verification.
    Used to prove that the governance rules have not been tampered with.
    """
    def __init__(self, leaves: List[str]):
        self.leaves = [self._hash(leaf) for leaf in leaves]
        self.tree = self._build_tree(self.leaves)

    def _hash(self, data: str) -> str:
        return hashlib.sha256(data.encode('utf-8')).hexdigest()

    def _build_tree(self, leaves: List[str]) -> List[List[str]]:
        tree = [leaves]
        while len(tree[-1]) > 1:
            current_level = tree[-1]
            next_level = []
            for i in range(0, len(current_level), 2):
                left = current_level[i]
                right = current_level[i+1] if i+1 < len(current_level) else left
                next_level.append(self._hash(left + right))
            tree.append(next_level)
        return tree

    def get_root(self) -> str:
        return self.tree[-1][0] if self.tree else ""

    def get_proof(self, index: int) -> List[str]:
        proof = []
        for level in range(len(self.tree) - 1):
            is_right_node = index % 2
            sibling_index = index - 1 if is_right_node else index + 1
            if sibling_index < len(self.tree[level]):
                proof.append(self.tree[level][sibling_index])
            else:
                proof.append(self.tree[level][index])
            index //= 2
        return proof

def verify_proof(leaf: str, proof: List[str], root: str) -> bool:
    """Verifies a Merkle proof against a known root."""
    current_hash = hashlib.sha256(leaf.encode('utf-8')).hexdigest()
    for sibling in proof:
        # Sort to ensure deterministic hashing
        combined = "".join(sorted([current_hash, sibling]))
        current_hash = hashlib.sha256(combined.encode('utf-8')).hexdigest()
    return current_hash == root

if __name__ == "__main__":
    # Example Governance Rules
    rules = [
        "RULE_X108_DELAY_108S",
        "RULE_SIGMA_STABILITY_THRESHOLD_80",
        "RULE_OS2_FILTER_STRICT",
        "RULE_MERKLE_SEAL_REQUIRED"
    ]
    
    tree = MerkleTree(rules)
    root = tree.get_root()
    
    print(f"--- Obsidia Merkle Integrity Proof ---")
    print(f"System Root: {root}")
    print(f"Rules Count: {len(rules)}")
    
    # Verify Rule 1
    rule_to_verify = rules[1]
    proof = tree.get_proof(1)
    is_valid = verify_proof(rule_to_verify, proof, root)
    
    print(f"\nVerifying Rule: '{rule_to_verify}'")
    print(f"Proof: {proof}")
    print(f"Result: {'✅ VALID' if is_valid else '❌ INVALID'}")
