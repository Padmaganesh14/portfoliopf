import { motion } from 'framer-motion';

const FLOATING_SYMBOLS = [
  { text: '</>', x: '6%', y: '18%', size: 'text-xs', color: 'text-[#8B5CF6]/[0.06]', duration: 25, delay: 0 },
  { text: '{ }', x: '92%', y: '22%', size: 'text-xs', color: 'text-[#38BDF8]/[0.05]', duration: 28, delay: 2 },
  { text: '=>', x: '8%', y: '48%', size: 'text-[11px]', color: 'text-[#8B5CF6]/[0.05]', duration: 22, delay: 4 },
  { text: '01', x: '91%', y: '54%', size: 'text-[11px]', color: 'text-[#39FF88]/[0.04]', duration: 26, delay: 1 },
  { text: './', x: '5%', y: '74%', size: 'text-xs', color: 'text-[#8B5CF6]/[0.05]', duration: 30, delay: 3 },
  { text: '$', x: '93%', y: '80%', size: 'text-xs', color: 'text-[#39FF88]/[0.05]', duration: 24, delay: 5 },
];

export default function DeveloperBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-transparent">
      
      {/* ─── 1. Minimal Developer Grid (40px x 40px, ultra faint) ─── */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.012) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.012) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 80%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 80%, transparent 100%)',
        }}
      />

      {/* ─── 2. Floating Monospace Symbols on Outer Edges ─── */}
      {FLOATING_SYMBOLS.map((symbol, idx) => (
        <motion.div
          key={idx}
          className={`absolute font-mono font-bold ${symbol.size} ${symbol.color} hidden md:block`}
          style={{ left: symbol.x, top: symbol.y }}
          animate={{
            y: [-8, 8, -8],
            x: [-3, 3, -3],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: symbol.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: symbol.delay,
          }}
        >
          {symbol.text}
        </motion.div>
      ))}

    </div>
  );
}
