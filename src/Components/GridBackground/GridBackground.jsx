import React from "react";

const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Exact Graph Paper / Square Grid Pattern - Soft Subtle Opacity */}
      <div className="absolute inset-0 bg-graph-grid opacity-30 dark:opacity-20" />

      {/* Subtle Ambient Glow Light in Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-violet-500/5 dark:from-violet-500/15 via-fuchsia-500/5 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
    </div>
  );
};

export default GridBackground;
