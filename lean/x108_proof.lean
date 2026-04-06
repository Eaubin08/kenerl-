/-
  Obsidia X-108 Temporal Gate Formal Proof
  This file defines the formal logic of the X-108 gate in Lean 4.
  It proves that no action can be taken before the duration τ (108s) has passed.
-/

import Lean

namespace Obsidia

-- Define the state of the system
inductive State
  | PENDING
  | ACT
  deriving Repr, DecidableEq

-- Define the duration constant τ
def τ : Nat := 108

-- Define the transition function based on time
def transition (s : State) (t : Nat) : State :=
  match s with
  | State.PENDING => if t < τ then State.PENDING else State.ACT
  | State.ACT => State.ACT

-- Theorem: No action can be taken before τ
theorem x108_temporal_gate (t : Nat) :
  t < τ → transition State.PENDING t = State.PENDING := by
  intro h
  simp [transition, h]

-- Theorem: Action is only possible after τ
theorem x108_act_after_tau (t : Nat) :
  t ≥ τ → transition State.PENDING t = State.ACT := by
  intro h
  have h_not_lt : ¬(t < τ) := by
    apply Nat.not_lt_of_ge h
  simp [transition, h_not_lt]

end Obsidia
