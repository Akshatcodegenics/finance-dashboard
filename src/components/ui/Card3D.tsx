import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export function Card3D({ children, className, depth = 10 }: Card3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${depth}deg`, `-${depth}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${depth}deg`, `${depth}deg`]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative rounded-[2rem] bg-surface backdrop-blur-xl border border-white/60 p-6',
        'shadow-[0_15px_60px_-15px_rgba(59,130,246,0.1)]',
        'transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.25)]',
        className
      )}
    >
      {/* Light glossy overlay */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/60 to-white/0 pointer-events-none" />
      <div style={{ transform: 'translateZ(30px)' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}
