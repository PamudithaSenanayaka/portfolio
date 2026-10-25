import React, { useRef } from "react";
import Navbar from "./Navbar";
// import MainImg from "../assets/brain2.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import RobotCanvas from "./RobotCanvas";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const CloudWord = ({
  item,
  index,
  scrollYProgress,
}: {
  item: any;
  index: number;
  scrollYProgress: any;
}) => {
  const r1 = pseudoRandom(index * 11);
  const r2 = pseudoRandom(index * 22);
  const r3 = pseudoRandom(index * 33);
  const r4 = pseudoRandom(index * 44);

  const directionX = r1 > 0.5 ? 1 : -1;
  const directionY = r2 > 0.5 ? 1 : -1;
  const rotateDir = r3 > 0.5 ? 1 : -1;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, directionX * (300 + r1 * 1200)],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, directionY * (300 + r2 * 1200)],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotateDir * (180 + r3 * 540)],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + r4 * 3]);

  return (
    <div
      className={`absolute ${item.pos} ${item.rotate || ""} whitespace-nowrap`}
    >
      <motion.div
        className={`${item.size} font-bold text-transparent drop-shadow-[0_0_10px_${item.color}] inline-block`}
        style={{
          WebkitTextStroke: `${item.stroke}px ${item.color}`,
          x,
          y,
          rotate,
          scale,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3 + r1 * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: r2 * 2,
        }}
      >
        {item.text}
      </motion.div>
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className="bg-[#09090B] mt-4 py-1 px-5 h-[97dvh] lg:h-[96dvh] border border-white/5 rounded-2xl relative overflow-hidden bg-grid"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <section className="relative z-20 mx-auto lg">
        <Navbar />
      </section>

      <div className="w-full h-auto lg:h-[93vh] flex flex-col lg:flex-row justify-center items-center text-white rounded-xl py-8 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full w-full lg:w-1/2 mt-6 lg:mt-70 flex flex-col justify-center items-start px-6 sm:px-10 lg:pl-20 z-10 relative"
        >
          <div className="flex flex-col xl:flex-row justify-between w-full h-full gap-8 xl:gap-0">
            <div className="w-full xl:w-auto z-20">
              
              <div className="space-y-1 ">
                <h1 className="font-roboto text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none">
                  PAMUDITHA
                </h1>
                <h1 className="font-roboto text-5xl md:text-8xl font-bold text-white/20 tracking-tighter leading-none ml-6 md:ml-16">
                  SENANAYAKA
                </h1>
              </div>

              <div className="mt-12 space-y-6 border-l border-white/10 pl-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium mb-1">
                    Engineering
                  </span>
                  <h2 className="text-xl md:text-2xl font-roboto text-white/80 font-light tracking-tight">
                    Full Stack Developer
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium mb-1">
                    Architecture
                  </span>
                  <h2 className="text-xl md:text-2xl font-roboto text-white/80 font-light tracking-tight">
                    Digital Solutions Architect
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium mb-1">
                    Strategy
                  </span>
                  <h2 className="text-xl md:text-2xl font-roboto text-white/80 font-light tracking-tight">
                    Business & Brand Strategist
                  </h2>
                </div>
              </div>
            </div>

            {/* Text Cloud Background */}
            <motion.div
              animate={{
                y: ["-50%", "-52%", "-50%"],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[100%] right-[5%] lg:right-[15%] w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] -translate-y-1/2 pointer-events-none mix-blend-screen z-0 select-none opacity-30"
            >
              <div className="relative w-full h-full font-roboto">
                {[
                  {
                    text: "FULL STACK",
                    size: "text-[30px] lg:text-[40px]",
                    pos: "top-[20%] left-[10%]",
                    color: "rgba(99,102,241,0.6)",
                    stroke: 1,
                  },
                  {
                    text: "CODE",
                    size: "text-[50px] lg:text-[70px]",
                    pos: "top-[10%] left-[55%]",
                    color: "rgba(168,85,247,0.5)",
                    stroke: 2,
                  },
                  {
                    text: "INNOVATE",
                    size: "text-[70px] lg:text-[90px]",
                    pos: "top-[35%] left-[5%]",
                    color: "rgba(99,102,241,0.6)",
                    stroke: 2,
                  },
                  {
                    text: "ARCHITECTURE",
                    size: "text-[20px] lg:text-[30px]",
                    pos: "top-[50%] left-[65%]",
                    color: "rgba(168,85,247,0.7)",
                    stroke: 1,
                    rotate: "-rotate-90 origin-left",
                  },
                  {
                    text: "ENGINEER",
                    size: "text-[60px] lg:text-[80px]",
                    pos: "top-[65%] left-[15%]",
                    color: "rgba(168,85,247,0.6)",
                    stroke: 2,
                  },
                  {
                    text: "DESIGN",
                    size: "text-[25px] lg:text-[35px]",
                    pos: "top-[85%] left-[15%]",
                    color: "rgba(99,102,241,0.6)",
                    stroke: 1,
                  },
                  {
                    text: "SYSTEMS",
                    size: "text-[35px] lg:text-[45px]",
                    pos: "top-[40%] left-[80%]",
                    color: "rgba(99,102,241,0.5)",
                    stroke: 1,
                  },
                  {
                    text: "STRATEGY",
                    size: "text-[20px] lg:text-[25px]",
                    pos: "top-[80%] left-[60%]",
                    color: "rgba(99,102,241,0.7)",
                    stroke: 1,
                  },
                  {
                    text: "REACT.JS",
                    size: "text-[20px] lg:text-[25px]",
                    pos: "top-[15%] left-[80%]",
                    color: "rgba(168,85,247,0.6)",
                    stroke: 1,
                    rotate: "rotate-90 origin-left",
                  },
                  {
                    text: "UI/UX",
                    size: "text-[15px] lg:text-[20px]",
                    pos: "top-[55%] left-[5%]",
                    color: "rgba(99,102,241,0.7)",
                    stroke: 1,
                  },
                  {
                    text: "CLOUD",
                    size: "text-[25px] lg:text-[30px]",
                    pos: "top-[75%] left-[85%]",
                    color: "rgba(168,85,247,0.6)",
                    stroke: 1,
                  },
                  {
                    text: "NODE.JS",
                    size: "text-[18px] lg:text-[22px]",
                    pos: "top-[25%] left-[75%]",
                    color: "rgba(99,102,241,0.5)",
                    stroke: 1,
                  },
                  {
                    text: "TYPESCRIPT",
                    size: "text-[16px] lg:text-[20px]",
                    pos: "top-[70%] left-[70%]",
                    color: "rgba(168,85,247,0.7)",
                    stroke: 1,
                  },
                  {
                    text: "PYTHON",
                    size: "text-[22px] lg:text-[28px]",
                    pos: "top-[5%] left-[25%]",
                    color: "rgba(99,102,241,0.6)",
                    stroke: 1,
                  },
                  {
                    text: "AI/ML",
                    size: "text-[14px] lg:text-[18px]",
                    pos: "top-[90%] left-[40%]",
                    color: "rgba(168,85,247,0.5)",
                    stroke: 1,
                  },
                ].map((item, index) => (
                  <CloudWord
                    key={index}
                    item={item}
                    index={index}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right side with QR code and decorative elements */}
            <div className="w-full xl:w-auto flex flex-col items-start xl:items-center justify-center relative z-10">
              {/* Glowing orbs/particles background */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full z-0 pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-0 left-1/4 w-40 h-40 bg-purple-500/20 blur-[70px] rounded-full z-0 pointer-events-none"
              />

              {/* Content Container */}
              <div className="z-10 w-full hidden lg:flex flex-col gap-10 items-start xl:items-center justify-center">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:ml-135 -mt-30">
                  {/* QR code to social profiles */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col items-center gap-3 relative group hover:border-indigo-500/30 transition-colors shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                    <div className="bg-white p-2 rounded-xl shadow-inner">
                      <QRCodeSVG
                        value="https://wa.me/94726442538"
                        size={70}
                        className="rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium group-hover:text-white/80 transition-colors">
                      Connect
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className=" w-full lg:w-1/2 h-[350px] sm:h-[500px] lg:h-full relative sm:mt-5 lg:-mt-25">
          <RobotCanvas cameraFov={36} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full z-10" />
        </div>
      </div>

      {/* Modern Decorative Element */}
      <div className="hidden md:flex absolute bottom-10 right-10 gap-4">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="border border-[#F5CB5C] w-12 h-12"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-[#222052] w-12 h-12"
        />
        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="border border-white/20 w-12 h-12"
        />
      </div>
    </div>
  );
};

export default Hero;
