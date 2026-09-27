// Shared helpers for every game: storage, best scores, sound, input.
// Everything is local — no network requests are ever made.
(function () {
  const PREFIX = 'mArcade_';

  const Arcade = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(PREFIX + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) { /* storage unavailable — ignore */ }
    },

    // Records a score and returns the best score so far.
    best(game, score) {
      const b = this.get(game + '_best', 0);
      if (score > b) {
        this.set(game + '_best', score);
        return score;
      }
      return b;
    },

    // ---- Sound (tiny WebAudio synth, no audio files) ----
    _ac: null,
    muted: false,
    audio() {
      if (!this._ac) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this._ac = new AC();
      }
      if (this._ac.state === 'suspended') this._ac.resume();
      return this._ac;
    },

    beep(freq, dur = 0.08, type = 'square', vol = 0.08, slide = 0) {
      if (this.muted) return;
      const ac = this.audio();
      if (!ac) return;
      const t = ac.currentTime;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
    },

    noise(dur = 0.2, vol = 0.12) {
      if (this.muted) return;
      const ac = this.audio();
      if (!ac) return;
      const len = Math.floor(ac.sampleRate * dur);
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const s = ac.createBufferSource();
      const g = ac.createGain();
      g.gain.value = vol;
      s.buffer = buf;
      s.connect(g).connect(ac.destination);
      s.start();
    },

    // ---- Input helpers ----
    // Stop arrow keys / space from scrolling the page while playing.
    preventScroll() {
      window.addEventListener('keydown', (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
        if (keys.includes(e.key) && !(e.target instanceof HTMLInputElement)) e.preventDefault();
      }, { passive: false });
    },

    // Calls cb('left'|'right'|'up'|'down'|'tap') for touch swipes on el.
    onSwipe(el, cb) {
      let sx = 0, sy = 0, active = false;
      el.addEventListener('touchstart', (e) => {
        const t = e.changedTouches[0];
        sx = t.clientX; sy = t.clientY; active = true;
      }, { passive: true });
      el.addEventListener('touchend', (e) => {
        if (!active) return;
        active = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - sx, dy = t.clientY - sy;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return cb('tap');
        if (Math.abs(dx) > Math.abs(dy)) cb(dx > 0 ? 'right' : 'left');
        else cb(dy > 0 ? 'down' : 'up');
      }, { passive: true });
    },

    // Converts a mouse/touch event to canvas pixel coordinates.
    canvasPos(canvas, e) {
      const r = canvas.getBoundingClientRect();
      const p = e.touches && e.touches.length ? e.touches[0] : (e.changedTouches && e.changedTouches[0]) || e;
      return {
        x: (p.clientX - r.left) * (canvas.width / r.width),
        y: (p.clientY - r.top) * (canvas.height / r.height),
      };
    },
  };

  Arcade.muted = Arcade.get('muted', false);

  // Older school browsers may lack roundRect — fall back to plain rectangles.
  if (window.CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h) { this.rect(x, y, w, h); };
  }

  // Wire up the shared mute button if the page has one.
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mute');
    if (!btn) return;
    const paint = () => { btn.textContent = Arcade.muted ? '🔇' : '🔊'; };
    paint();
    btn.addEventListener('click', () => {
      Arcade.muted = !Arcade.muted;
      Arcade.set('muted', Arcade.muted);
      paint();
      btn.blur();
    });
  });

  window.Arcade = Arcade;
})();
