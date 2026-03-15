// Create placeholder sound effects using Web Audio API
// since we don't have actual audio files yet

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(frequency: number, duration: number) {
  if (!audioContext) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + duration);
}

export const soundEffects = {
  // Card flip sound - higher pitch
  cardFlip: () => playTone(800, 0.1),

  // Match sound - ascending tones
  match: () => {
    playTone(523, 0.15); // C5
    setTimeout(() => playTone(659, 0.15), 100); // E5
    setTimeout(() => playTone(784, 0.15), 200); // G5
  },

  // Error sound - descending tones
  error: () => {
    playTone(400, 0.1);
    setTimeout(() => playTone(300, 0.1), 100);
  },

  // Win sound - victory fanfare
  win: () => {
    playTone(523, 0.2); // C5
    setTimeout(() => playTone(587, 0.2), 200); // D5
    setTimeout(() => playTone(659, 0.2), 400); // E5
    setTimeout(() => playTone(784, 0.4), 600); // G5
  },

  // Button click sound
  click: () => playTone(1000, 0.05),
};

export function playSound(
  effect: keyof typeof soundEffects,
  enabled: boolean
) {
  if (enabled) {
    soundEffects[effect]();
  }
}
