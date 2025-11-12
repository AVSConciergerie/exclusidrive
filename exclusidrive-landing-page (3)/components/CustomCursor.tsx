import React, { useState, useEffect, useRef } from 'react';

const TRAIL_COUNT = 10;

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [trail, setTrail] = useState(Array(TRAIL_COUNT).fill({ x: -100, y: -100 }));
  const [isMobile, setIsMobile] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const dx = clientX - lastPosition.current.x;
      const dy = clientY - lastPosition.current.y;
      
      // Only update angle if there's significant movement
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(newAngle);
      }
      
      setPosition({ x: clientX, y: clientY });
      setTrail(prevTrail => [{ x: clientX, y: clientY }, ...prevTrail.slice(0, TRAIL_COUNT - 1)]);
      lastPosition.current = { x: clientX, y: clientY };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Light Trail */}
      {trail.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-40 rounded-full bg-amber-400"
          style={{
            left: p.x,
            top: p.y,
            width: `${Math.max(0, 10 - i)}px`,
            height: `${Math.max(0, 10 - i)}px`,
            opacity: 0.7 - i * (0.7 / TRAIL_COUNT),
            transform: 'translate(-50%, -50%)',
            filter: 'blur(4px)',
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}

      {/* Car SVG */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <svg width="40" height="20" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]">
            <path d="M47.5 10.5C47.5 9.11929 46.3807 8 45 8H37.5L32.5 3H17.5L12.5 8H5C3.61929 8 2.5 9.11929 2.5 10.5V14.5C2.5 15.8807 3.61929 17 5 17H7V20.5C7 21.3284 7.67157 22 8.5 22H11.5C12.3284 22 13 21.3284 13 20.5V17H37V20.5C37 21.3284 37.6716 22 38.5 22H41.5C42.3284 22 43 21.3284 43 20.5V17H45C46.3807 17 47.5 15.8807 47.5 14.5V10.5Z" 
            fill="rgba(26, 26, 26, 0.8)" 
            stroke="#FFD700" 
            strokeWidth="1.5"/>
            <path d="M14 8L18 4H32L36 8H14Z" fill="#FFD700" fillOpacity="0.3"/>
            <path d="M2.5 11.5 H 47.5" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.5"/>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
