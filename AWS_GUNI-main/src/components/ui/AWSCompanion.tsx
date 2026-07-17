import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

// AWS Cloud Companion quotes
const COMPANION_QUOTES = [
  "Ready to build! Let's deploy some serverless functions.",
  "Checking S3 bucket health... All objects secure and encrypted!",
  "Is it time for a Cloud Practitioner study session?",
  "Remember to rotate your IAM access keys regularly!",
  "A serverless architecture keeps your costs low and scalability infinite!",
  "Need help with AWS Lambda? I can help you write the handler function.",
  "Provisioning resources... CloudFormation template validation successful!",
  "Let's build something amazing on AWS today!",
  "DynamoDB tables are ready for high-throughput queries.",
  "VPC security groups configured. Access restricted to authorized endpoints only.",
  "CI/CD pipeline is active. Code commit triggered successful deployment!",
  "Always design for high availability and fault tolerance!",
  "Have you enabled AWS Budgets? Good practice to track cloud spend!",
  "AWS Certified? You're on the path to cloud mastery!",
  "Beep boop! Scaling up instances to handle the traffic spike!",
  "Optimizing cloud costs... detected 0 idle EC2 instances!",
  "Deploying containers with AWS ECS and Fargate. Lightweight and scalable!",
  "Generative AI with Amazon Bedrock? Let's build a smart agent!"
];

// Cloud/Tech symbols for rising effect on click
const CLOUD_SYMBOLS = ["️", "", "️", "", "", "λ", "AWS"];

interface Note {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export const AWSCompanion: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [showQuote, setShowQuote] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [constraints, setConstraints] = useState({ left: 10, right: 800, top: 120, bottom: 600 });

  // Motion values for direct animation control to prevent snap-fights and resets on re-render
  const x = useMotionValue(100);
  const y = useMotionValue(400);
  const rotate = useMotionValue(0);

  // Refs for tracking active framer-motion animations
  const animX = useRef<any>(null);
  const animY = useRef<any>(null);
  const animRotate = useRef<any>(null);

  // Refs for speech bubble clear timers
  const quoteTimerRef = useRef<any>(null);

  // Function to start a slow, sweeping float to a random location inside viewport
  const startFloating = (startX: number, startY: number) => {
    if (animX.current) animX.current.stop();
    if (animY.current) animY.current.stop();

    const w = window.innerWidth;
    const h = window.innerHeight;

    const minX = 10;
    const maxX = Math.max(10, w - 110);
    const minY = 120; // safe space for speech bubble
    const maxY = Math.max(120, h - 110);

    const targetX = minX + Math.random() * (maxX - minX);
    const targetY = minY + Math.random() * (maxY - minY);

    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Drifts around at a constant slow speed (20 to 30px per second)
    const speed = 20 + Math.random() * 10;
    const duration = Math.max(1, distance / speed);

    animX.current = animate(x, targetX, {
      duration: duration,
      ease: "easeInOut",
      onComplete: () => {
        startFloating(targetX, targetY);
      }
    });

    animY.current = animate(y, targetY, {
      duration: duration,
      ease: "easeInOut"
    });
  };

  // Initialize and update positions and constraints
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Set initial position
    const initialX = w * 0.05;
    const initialY = h * 0.75;
    x.set(initialX);
    y.set(initialY);

    setConstraints({
      left: 10,
      right: w - 110,
      top: 120,
      bottom: h - 110
    });

    // Start gentle float loop
    startFloating(initialX, initialY);

    // Start slow swing loop
    animRotate.current = animate(rotate, 3, {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    });

    const handleResize = () => {
      const currentW = window.innerWidth;
      const currentH = window.innerHeight;
      
      setConstraints({
        left: 10,
        right: currentW - 110,
        top: 120,
        bottom: currentH - 110
      });

      // Keep companion inside bounds if window shrinks
      const currentX = x.get();
      const currentY = y.get();
      const newMaxX = Math.max(10, currentW - 110);
      const newMaxY = Math.max(120, currentH - 110);

      if (currentX > newMaxX || currentY > newMaxY || currentX < 10 || currentY < 120) {
        const safeX = Math.min(Math.max(10, currentX), newMaxX);
        const safeY = Math.min(Math.max(120, currentY), newMaxY);
        startFloating(safeX, safeY);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animX.current) animX.current.stop();
      if (animY.current) animY.current.stop();
      if (animRotate.current) animRotate.current.stop();
      if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    };
  }, []);

  // Trigger a quote
  const handleInteract = () => {
    // Clear any active timers to prevent conflicts
    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);

    const randomQuote = COMPANION_QUOTES[Math.floor(Math.random() * COMPANION_QUOTES.length)];
    setQuote(randomQuote);
    setShowQuote(true);

    // Create rising click cloud tech symbols
    const newNotes = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 50,
      y: -20 - Math.random() * 20,
      symbol: CLOUD_SYMBOLS[Math.floor(Math.random() * CLOUD_SYMBOLS.length)]
    }));
    setNotes((prev) => [...prev, ...newNotes]);

    // Keep speech bubble visible for 6 seconds
    quoteTimerRef.current = setTimeout(() => {
      setShowQuote(false);
    }, 6000);
  };

  // Auto clean up floating notes
  useEffect(() => {
    if (notes.length > 0) {
      const timer = setTimeout(() => {
        setNotes((prev) => prev.slice(3));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notes]);

  // Periodic random wiggles and dialogue triggers
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      // 20% chance to speak every 25 seconds
      if (Math.random() < 0.2 && !showQuote) {
        handleInteract();
      }
    }, 25000);

    return () => clearInterval(quoteInterval);
  }, [showQuote]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating companion container */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 pointer-events-auto"
        style={{ x, y }}
        drag
        dragElastic={0.15}
        dragConstraints={constraints}
        onDragStart={() => {
          if (animX.current) animX.current.stop();
          if (animY.current) animY.current.stop();
        }}
        onDragEnd={() => {
          handleInteract();

          // Resume floating from the dropped location
          const currentX = x.get();
          const currentY = y.get();
          startFloating(currentX, currentY);
        }}
        whileDrag={{ scale: 1.12 }}
      >
        <div className="relative group flex flex-col items-center">
          {/* Custom AWS speech text box */}
          <AnimatePresence>
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                className="absolute bottom-28 w-72 sm:w-80 p-4 bg-[#030303]/95 border-2 border-[#a855f7] text-white text-xs sm:text-sm font-semibold font-mono text-center rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.45)] backdrop-blur-md select-none leading-relaxed"
                style={{
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.35), inset 0 0 10px rgba(168, 85, 247, 0.2)"
                }}
              >
                {quote}
                {/* Pointer tip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#030303] border-r-2 border-b-2 border-[#a855f7] rotate-45 -mt-1.5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render rising cloud symbols */}
          {notes.map((note) => (
            <motion.span
              key={note.id}
              initial={{ opacity: 1, y: -20, x: note.x, scale: 0.7 }}
              animate={{ opacity: 0, y: -90, scale: 1.3 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute text-sm select-none text-glow-purple text-[#d946ef] font-bold"
            >
              {note.symbol}
            </motion.span>
          ))}

          {/* Robotic Cloud Companion Graphic */}
          <motion.div
            onClick={handleInteract}
            style={{ rotate }}
            className="w-24 h-24 flex items-center justify-center cursor-pointer select-none"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <defs>
                  <radialGradient id="cloudGrad">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </radialGradient>

                  <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                    <feOffset dy="2" result="offsetBlur" />
                    <feMerge>
                      <feMergeNode in="offsetBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Floating Mist Under Cloud */}
                <motion.ellipse
                  cx="50"
                  cy="68"
                  rx="28"
                  ry="6"
                  fill="#ffffff"
                  opacity="0.15"
                  animate={{
                    scaleX: [1, 1.15, 1],
                    opacity: [0.12, 0.25, 0.12]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Main Cloud Body */}
                <g filter="url(#cloudShadow)">
                  <ellipse
                    cx="50"
                    cy="48"
                    rx="34"
                    ry="18"
                    fill="url(#cloudGrad)"
                  />

                  <circle
                    cx="30"
                    cy="42"
                    r="14"
                    fill="url(#cloudGrad)"
                  />

                  <circle
                    cx="50"
                    cy="34"
                    r="18"
                    fill="url(#cloudGrad)"
                  />

                  <circle
                    cx="70"
                    cy="42"
                    r="14"
                    fill="url(#cloudGrad)"
                  />

                  <ellipse
                    cx="50"
                    cy="50"
                    rx="34"
                    ry="18"
                    fill="none"
                    stroke="#d8b4fe"
                    strokeWidth="1.5"
                    opacity="0.45"
                  />
                </g>

                {/* Floating Sparkles */}
                <motion.circle
                  cx="18"
                  cy="26"
                  r="2"
                  fill="#c084fc"
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity
                  }}
                />

                <motion.circle
                  cx="82"
                  cy="24"
                  r="2"
                  fill="#c084fc"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity
                  }}
                />

                {/* Eyes */}
                <motion.rect
                  x="38"
                  y="40"
                  width="7"
                  height="10"
                  rx="3.5"
                  fill="#a855f7"
                  animate={{
                    scaleY: [1, 1, 0.1, 1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                  style={{
                    originX: "41.5px",
                    originY: "45px"
                  }}
                />

                <motion.rect
                  x="55"
                  y="40"
                  width="7"
                  height="10"
                  rx="3.5"
                  fill="#a855f7"
                  animate={{
                    scaleY: [1, 1, 0.1, 1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                  style={{
                    originX: "58.5px",
                    originY: "45px"
                  }}
                />

                {/* Blush */}
                <circle
                  cx="31"
                  cy="52"
                  r="3"
                  fill="#f0abfc"
                  opacity="0.5"
                />

                <circle
                  cx="69"
                  cy="52"
                  r="3"
                  fill="#f0abfc"
                  opacity="0.5"
                />

                {/* Smile */}
                <path
                  d="M 42 55 Q 50 62 58 55"
                  stroke="#ff9900"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Water Drop */}
                <motion.path
                  d="M50 74 C47 78 47 81 50 83 C53 81 53 78 50 74Z"
                  fill="#60a5fa"
                  animate={{
                    y: [0, 4, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
          </motion.div>

          {/* Interactive Help Hint */}
          <span className="text-[8px] font-mono text-slate-500 uppercase select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mt-1">
            [drag // click]
          </span>
        </div>
      </motion.div>
    </div>
  );
};
