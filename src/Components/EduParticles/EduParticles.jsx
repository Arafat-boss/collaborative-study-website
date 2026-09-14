import React, { useEffect, useRef } from "react";

// Comprehensive educational symbols across Math, English, Bangla, Physics/Science, Programming, and General Study
const EDU_CATEGORIES = {
  // বাংলা (Bangla Alphabet, Grammar & Literature)
  bangla: [
    "অ", "আ", "ক", "খ", "গ", "ম", "ব", "র", "জ্ঞ", "বাংলা", "বর্ণ", "শব্দ", "জ্ঞান", "সাহিত্য", "কাব্য", "ণ"
  ],
  // English (Language, Grammar & Literature)
  english: [
    "Aa", "Zz", "Grammar", "Vocab", "A→Z", "Noun", "Verb", "Read", "Write", "Essay", "Poetry", "Syntax"
  ],
  // Mathematics (গণিত)
  math: [
    "∑", "π", "∫", "√x", "∞", "f(x)", "Δy", "≈", "±", "θ", "x²", "lim", "sin θ", "cos θ", "log", "d/dx"
  ],
  // Physics & Natural Sciences (পদার্থ ও বিজ্ঞান)
  science: [
    "E=mc²", "λ", "Ω", "⚛", "F=ma", "ħ", "v=d/t", "ψ", "H₂O", "CO₂", "pH", "DNA", "⚡", "½mv²"
  ],
  // Computer Science & Programming (কম্পিউটার ও কোডিং)
  programming: [
    "</>", "{ }", "[ ]", "=>", "&&", "0101", "git", "const", "!==", "++", "fn()", "async", "npm", "SQL", "API"
  ],
  // General Education & Academic Milestones (শিক্ষা ও বিদ্যা)
  general: [
    "Study", "Learn", "IQ", "Ideas", "Books", "100%", "Knowledge", "Exam", "Class", "A+"
  ]
};

const CATEGORY_KEYS = Object.keys(EDU_CATEGORIES);

// Subdued, subtle palette for Light Mode (low contrast, soft watermark style)
const LIGHT_COLORS = [
  "rgba(71, 85, 105, ",   // Slate 600
  "rgba(37, 99, 235, ",   // Blue 600
  "rgba(79, 70, 229, ",   // Indigo 600
  "rgba(124, 58, 237, ",  // Violet 600
  "rgba(13, 148, 136, ",  // Teal 600
  "rgba(2, 132, 199, ",   // Sky 600
];

// Subdued, elegant palette for Dark Mode (celestial pastel neons)
const DARK_COLORS = [
  "rgba(148, 163, 184, ", // Slate 400
  "rgba(96, 165, 250, ",  // Blue 400
  "rgba(129, 140, 248, ", // Indigo 400
  "rgba(167, 139, 250, ", // Violet 400
  "rgba(56, 189, 248, ",  // Sky 400
  "rgba(52, 211, 153, ",  // Emerald 400
];

const EduParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Smooth mouse tracker with target and current positions for elastic damping
    const mouse = {
      x: -2000,
      y: -2000,
      currX: -2000,
      currY: -2000,
      radius: 160,
      isActive: false,
    };

    const isDark = () =>
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";

    // Modest density so screen never feels crowded or distracting
    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      if (window.innerWidth < 640) return Math.floor(area / 38000); // ~20 on mobile
      if (window.innerWidth < 1024) return Math.floor(area / 30000); // ~30 on tablet
      return Math.min(48, Math.floor(area / 24000)); // ~40-48 on desktop
    };

    let categoryIndexTracker = 0;

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 30;

        // Balanced category assignment across all education domains
        const catKey = CATEGORY_KEYS[categoryIndexTracker % CATEGORY_KEYS.length];
        categoryIndexTracker++;
        const symbolsList = EDU_CATEGORIES[catKey];
        this.symbol = symbolsList[Math.floor(Math.random() * symbolsList.length)];
        this.category = catKey;

        // Ultra-slow, peaceful floating drift
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = -(0.08 + Math.random() * 0.12); // Very slow upward motion

        // Smooth physical force displacement
        this.fx = 0;
        this.fy = 0;

        // Proportional sizing
        const isWord = this.symbol.length > 2;
        this.size = isWord
          ? Math.floor(11 + Math.random() * 4)   // 11px - 14px for words
          : Math.floor(13 + Math.random() * 7);  // 13px - 19px for symbols

        // Subdued, very low base opacity for subtle watermark aesthetic
        this.baseAlpha = 0.08 + Math.random() * 0.07; // ~0.08 - 0.15
        this.alpha = this.baseAlpha;
        this.targetAlpha = this.baseAlpha;

        this.colorIndex = Math.floor(Math.random() * LIGHT_COLORS.length);
        this.rotation = (Math.random() - 0.5) * 0.25; // Gentle tilt
        this.wobbleSpeed = 0.008 + Math.random() * 0.01;
        this.wobbleVal = Math.random() * Math.PI * 2;
      }

      update() {
        // Very gentle side-to-side harmonic swaying
        this.wobbleVal += this.wobbleSpeed;
        const wobbleX = Math.sin(this.wobbleVal) * 0.12;

        // Smooth mouse interaction (soft, elastic glide)
        if (mouse.isActive) {
          const dx = this.x - mouse.currX;
          const dy = this.y - mouse.currY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);

            // Soft gradual acceleration away from cursor
            const targetFx = Math.cos(angle) * force * 1.8;
            const targetFy = Math.sin(angle) * force * 1.8;
            this.fx += (targetFx - this.fx) * 0.08;
            this.fy += (targetFy - this.fy) * 0.08;

            // Graceful slight highlight when near mouse (still soft, not glaring)
            this.targetAlpha = Math.min(0.32, this.baseAlpha + force * 0.20);
          } else {
            this.targetAlpha = this.baseAlpha;
          }
        } else {
          this.targetAlpha = this.baseAlpha;
        }

        // Smooth opacity lerp
        this.alpha += (this.targetAlpha - this.alpha) * 0.04;

        // Position update
        this.x += this.vx + wobbleX + this.fx;
        this.y += this.vy + this.fy;

        // High friction damping for smooth, fluid-like deceleration
        this.fx *= 0.96;
        this.fy *= 0.96;

        // Boundary wrapping
        if (this.y < -35) {
          this.y = height + 30;
          this.x = Math.random() * width;
        }
        if (this.x < -35) this.x = width + 30;
        if (this.x > width + 35) this.x = -30;
      }

      draw(darkMode) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const palette = darkMode ? DARK_COLORS : LIGHT_COLORS;
        const colorPrefix = palette[this.colorIndex];

        ctx.fillStyle = `${colorPrefix}${this.alpha})`;
        ctx.font = `500 ${this.size}px 'Hind Siliguri', 'Segoe UI', system-ui, -apple-system, Roboto, 'Noto Sans Bengali', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.symbol, 0, 0);

        ctx.restore();
      }
    }

    let particles = Array.from({ length: getParticleCount() }, () => new Particle());

    // Faint constellation connection lines between adjacent particles
    const drawConnections = (darkMode) => {
      if (!mouse.isActive) return;
      const maxConnDist = 90;
      const palette = darkMode ? DARK_COLORS : LIGHT_COLORS;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dMouse = Math.hypot(p1.x - mouse.currX, p1.y - mouse.currY);
        if (dMouse > mouse.radius + 20) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnDist) {
            // Very subtle connection line alpha
            const lineAlpha = (1 - dist / maxConnDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `${palette[0]}${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.setLineDash([3, 4]);
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation (lerp)
      if (mouse.isActive) {
        mouse.currX += (mouse.x - mouse.currX) * 0.12;
        mouse.currY += (mouse.y - mouse.currY) * 0.12;
      }

      const darkMode = isDark();

      particles.forEach((p) => {
        p.update();
        p.draw(darkMode);
      });

      drawConnections(darkMode);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Handlers
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: getParticleCount() }, () => new Particle());
    };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.isActive) {
        mouse.currX = e.clientX;
        mouse.currY = e.clientY;
      }
      mouse.isActive = true;
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default EduParticles;
