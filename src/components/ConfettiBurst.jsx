import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiBurst = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  const burst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      targetX: (Math.random() - 0.5) * 300,
      targetY: (Math.random() - 0.5) * 300,
      color: ['#E91E63', '#F5C842', '#800020', '#10B981', '#3B82F6'][i % 5],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1, rotate: 0 }}
            animate={{
              opacity: 0,
              x: p.x + p.targetX,
              y: p.y + p.targetY,
              scale: 0.2,
              rotate: p.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiBurst;
