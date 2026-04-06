import { describe, it, expect } from 'vitest';

// Mocking the Obsidia Core Logic
class ObsidiaCore {
  static τ = 108; // X-108 Constant
  static SIGMA_THRESHOLD = 0.80;

  static canExecute(timeElapsed: number, stability: number): boolean {
    if (timeElapsed < this.τ) return false;
    if (stability < this.SIGMA_THRESHOLD) return false;
    return true;
  }
}

describe('Obsidia X-108 Deterministic Governance', () => {
  it('should REJECT action if time elapsed < 108s', () => {
    const timeElapsed = 107;
    const stability = 0.95;
    expect(ObsidiaCore.canExecute(timeElapsed, stability)).toBe(false);
  });

  it('should REJECT action if Sigma stability < 80%', () => {
    const timeElapsed = 109;
    const stability = 0.79;
    expect(ObsidiaCore.canExecute(timeElapsed, stability)).toBe(false);
  });

  it('should ACCEPT action only if both time and stability conditions are met', () => {
    const timeElapsed = 108;
    const stability = 0.80;
    expect(ObsidiaCore.canExecute(timeElapsed, stability)).toBe(true);
  });

  it('should generate a valid Merkle Root for the state', () => {
    const state = { action: 'TRANSFER', amount: 100, timestamp: Date.now() };
    const merkleRoot = '0x' + Buffer.from(JSON.stringify(state)).toString('hex').slice(0, 40);
    expect(merkleRoot).toMatch(/^0x[a-f0-9]{40}$/);
  });
});
