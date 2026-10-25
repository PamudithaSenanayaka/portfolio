import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/AboutMe";
import TechStack from "./components/TechStack";
import Project from "./components/Project";
import Contact from "./components/Coontact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
// import ScrollProgressRail from "./components/ScrollProgressRail";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent browser restoring previous scroll position on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (isLoading) {
      // Lock scroll while intro is playing
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll when intro finishes and reset to top
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  const handleIntroComplete = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setIsLoading(false);
  };

  return (
    <>
      <CustomCursor />
      
      {isLoading && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      <div>
        {/* <ScrollProgressRail /> */}
        <section id="home" className="w-[98%] mx-auto ">
          <Hero />
        </section>

        <section id="about" className="lg:w-[80%] w-[100%] mt-0 lg:h-[100dvh] mx-auto">
          <About />
        </section>

        <section id="tech-stack" className="mt-0 lg:h-[100dvh]">
          <TechStack />
        </section>
        
        <section id="projects" className="mt-10 w-[98%] h-[99dvh] lg:h-[95dvh] mx-auto">
          <Project />
        </section>
        
        <section id="contact" className="lg:mt-20 mt-10 w-[90%] mx-auto">
          <Contact />
        </section>
        
        <section className="mt-10">
          <Footer />
        </section>
      </div>
    </>
  );
}

export default App;

