import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-[9990] hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, rgba(245, 200, 66, 0.04) 45%, transparent 70%)',
        filter: 'blur(30px)',
      }}
      animate={{
        x: mousePosition.x - 160,
        y: mousePosition.y - 160,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};

export default CursorGlow;
