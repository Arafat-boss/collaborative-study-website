import React, { useEffect, useRef } from "react";
import useTheme from "../../Hooks/useTheme";

const SquareParticles = ({ count = 45, connectionDistance = 140, isGlobal = true }) => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const updateDimensions = () => {
      if (isGlobal) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    updateDimensions();

    const mouse = {
      x: null,
      y: null,
      radius: 160,
    };

    const handleResize = () => {
      updateDimensions();
    };

    const handleMouseMove = (e) => {
      if (isGlobal) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      } else {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Color Palettes
    const squareColors = isDark
      ? [
          { fill: "rgba(56, 189, 248, 0.12)", stroke: "rgba(56, 189, 248, 0.65)" },   // Sky
          { fill: "rgba(129, 140, 248, 0.10)", stroke: "rgba(129, 140, 248, 0.60)" }, // Indigo
          { fill: "rgba(168, 85, 247, 0.10)", stroke: "rgba(168, 85, 247, 0.55)" },  // Purple
          { fill: "rgba(52, 211, 153, 0.12)", stroke: "rgba(52, 211, 153, 0.60)" },  // Emerald
        ]
      : [
          { fill: "rgba(37, 99, 235, 0.08)", stroke: "rgba(37, 99, 235, 0.40)" },    // Blue
          { fill: "rgba(79, 70, 229, 0.07)", stroke: "rgba(79, 70, 229, 0.38)" },    // Indigo
          { fill: "rgba(14, 165, 233, 0.08)", stroke: "rgba(14, 165, 233, 0.40)" },   // Sky
          { fill: "rgba(16, 185, 129, 0.07)", stroke: "rgba(16, 185, 129, 0.35)" },   // Emerald
        ];

    const lineColor = isDark
      ? "rgba(56, 189, 248, "
      : "rgba(37, 99, 235, ";

    // Square Particle Class
    class Square {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 16 + 8; // 8px to 24px square size
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.02;
        this.palette = squareColors[Math.floor(Math.random() * squareColors.length)];
        this.isSolid = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spinSpeed;

        // Wrap around screen edges smoothly
        if (this.x < -30) this.x = canvas.width + 30;
        if (this.x > canvas.width + 30) this.x = -30;
        if (this.y < -30) this.y = canvas.height + 30;
        if (this.y > canvas.height + 30) this.y = -30;

        // Mouse Repulsion & Spin Acceleration
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
            this.angle += force * 0.05;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const half = this.size / 2;

        // Draw Square
        ctx.beginPath();
        ctx.rect(-half, -half, this.size, this.size);

        if (this.isSolid) {
          ctx.fillStyle = this.palette.fill;
          ctx.fill();
        }

        ctx.strokeStyle = this.palette.stroke;
        ctx.lineWidth = isDark ? 1.2 : 1.0;
        ctx.stroke();

        // Inner glowing center point
        ctx.beginPath();
        ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = this.palette.stroke;
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize Squares
    const density = Math.floor((canvas.width * canvas.height) / 32000);
    const targetCount = Math.min(count, Math.max(25, density));
    const squares = Array.from({ length: targetCount }, () => new Square());

    // Connect Nearby Squares
    const connectSquares = () => {
      for (let i = 0; i < squares.length; i++) {
        for (let j = i + 1; j < squares.length; j++) {
          const dx = squares[i].x - squares[j].x;
          const dy = squares[i].y - squares[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * (isDark ? 0.25 : 0.16);
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(squares[i].x, squares[i].y);
            ctx.lineTo(squares[j].x, squares[j].y);
            ctx.stroke();
          }
        }

        // Connection to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - squares[i].x;
          const dy = mouse.y - squares[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const opacity = (1 - dist / mouse.radius) * (isDark ? 0.45 : 0.28);
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${opacity})`;
            ctx.lineWidth = 1.0;
            ctx.moveTo(squares[i].x, squares[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connectSquares();

      squares.forEach((sq) => {
        sq.update();
        sq.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, connectionDistance, isDark, isGlobal]);

  return (
    <canvas
      ref={canvasRef}
      className={
        isGlobal
          ? "fixed inset-0 pointer-events-none z-0 opacity-85"
          : "absolute inset-0 pointer-events-none z-0 opacity-85"
      }
    />
  );
};

export default SquareParticles;
