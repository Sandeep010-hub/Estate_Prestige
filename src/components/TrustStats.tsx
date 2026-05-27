import React, { useEffect, useState, useRef } from 'react';

export default function TrustStats() {
  const [stats, setStats] = useState({
    plots: 0,
    locations: 0,
    years: 0,
    families: 0,
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counts
          let startTimestamp: number | null = null;
          const duration = 1500; // ms
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            setStats({
              plots: Math.floor(progress * 73),
              locations: Math.floor(progress * 5),
              years: Math.floor(progress * 4),
              families: Math.floor(progress * 122),
            });
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setStats({
                plots: 73,
                locations: 5,
                years: 4,
                families: 122,
              });
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#090e1c] py-12 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-5xl text-[#ffc02c] font-medium">
            {stats.plots}+
          </span>
          <span className="font-sans text-[11px] tracking-wider text-[#d4c5ad] uppercase mt-2">
            Plots Sold
          </span>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-5xl text-[#ffc02c] font-medium">
            {stats.locations}+
          </span>
          <span className="font-sans text-[11px] tracking-wider text-[#d4c5ad] uppercase mt-2">
            Locations
          </span>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-5xl text-[#ffc02c] font-medium">
            {stats.years}+
          </span>
          <span className="font-sans text-[11px] tracking-wider text-[#d4c5ad] uppercase mt-2">
            Years of Trust
          </span>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <span className="font-serif text-3xl md:text-5xl text-[#ffc02c] font-medium">
            {stats.families}+
          </span>
          <span className="font-sans text-[11px] tracking-wider text-[#d4c5ad] uppercase mt-2">
            Families
          </span>
        </div>
      </div>
    </section>
  );
}
