import React, { useEffect, useState } from "react";
import Tire from "../assets/tire.png";

interface IntroLoaderProps {
  onComplete?: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progress counter 0 -> 100 (4.5s athule)
  useEffect(() => {
    const start = performance.now();
    const duration = 4500;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Curtain exit animation: 4.6s delay + 0.8s duration = 5.4s
    // Call onComplete right as curtain finishes to unlock scroll
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 5400);

    // Remove from DOM shortly after
    const hideTimer = setTimeout(() => setVisible(false), 5600);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="loader-curtain fixed inset-0 z-[100000] flex flex-col items-center justify-center gap-6 overflow-hidden bg-white pointer-events-none select-none">
      <style>{`
        /* Tire eka rolling (left -> right). Center eka = track eke ागal end eka */
        @keyframes tireRoll {
          from { transform: translateX(-75px) rotate(0deg); }
          to   { transform: translateX(calc(100vw - 75px)) rotate(1200deg); }
        }

        /* Tire eka pitipassen skid track eka draw wenawa */
        @keyframes trackGrow {
          from { width: 0; }
          to   { width: 100vw; }
        }

        /* Akuru outline paint */
        @keyframes drawStroke {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }

        /* Outline iwara unama fill fade-in */
        @keyframes fillIn {
          from { fill: transparent; }
          to   { fill: #000; }
        }

        /* Subtitle fade-in */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Progress bar */
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Curtain exit: uda yanawa */
        @keyframes curtainUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }

        .loader-curtain {
          animation: curtainUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) 4.6s forwards;
        }

        .tire-roll {
          animation: tireRoll 3s linear forwards;
        }

        .tire-track {
          animation: trackGrow 3s linear forwards;
        }

        .draw-text {
          fill: transparent;
          stroke: #000;
          stroke-width: 1.5;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation:
            drawStroke 3s ease-in-out 1s forwards,
            fillIn 0.6s ease 3.8s forwards;
        }

        .subtitle {
          opacity: 0;
          animation: fadeUp 0.6s ease 4s forwards;
        }

        .progress-bar {
          animation: barGrow 4.5s linear forwards;
        }
      `}</style>

      {/* Name eka (outline paint -> fill) */}
      <svg
        viewBox="0 0 900 170"
        className="w-[90vw] max-w-[900px]"
        aria-label="Pamuditha Senanayaka"
      >
        <text
          x="450"
          y="70"
          textAnchor="middle"
          fontSize="72"
          fontWeight="700"
          className="draw-text"
        >
          PAMUDITHA
        </text>
        <text
          x="450"
          y="150"
          textAnchor="middle"
          fontSize="68"
          fontWeight="700"
          className="draw-text"
        >
          SENANAYAKA
        </text>
      </svg>

      <p className="subtitle text-sm tracking-[0.4em] text-black/60 uppercase">
        Digital Solutions Architect
      </p>

      {/* Tire + skid track */}
      <div className="relative h-[150px] w-full">
        {/* Skid track: tire eka yana gaman pahalin dashed line */}
        <div
          className="tire-track absolute left-0 h-0 border-b-[3px] border-dashed border-black/40"
          style={{ top: "calc(100% - 6px)" }}
        />
        <img
          src={Tire}
          alt="Tire"
          width={150}
          height={150}
          className="tire-roll absolute left-0 top-0"
        />
      </div>

      {/* Progress bar + percentage */}
      <div className="absolute bottom-10 left-1/2 flex w-[260px] -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-[3px] w-full overflow-hidden rounded bg-black/10">
          <div className="progress-bar h-full bg-black" />
        </div>
        <span className="text-xs tabular-nums text-black/60">{progress}%</span>
      </div>
    </div>
  );
};

export default IntroLoader;