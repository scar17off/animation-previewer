import React, { useEffect, useRef, useState } from 'react';
import { animations, initializePoints } from '../animations';

const AnimationPreviewer = () => {
  const canvasRef = useRef(null);
  const [selectedAnimation, setSelectedAnimation] = useState('circle');
  const [maxDots, setMaxDots] = useState(20);
  const [fps, setFps] = useState(60);
  const [radius, setRadius] = useState(100);
  const [speed, setSpeed] = useState(0.05);
  const iterationRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const [points, setPoints] = useState(() => initializePoints(maxDots, radius));
  const pointsRef = useRef(points);

  const drawPoints = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw coordinate system
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#00ff00';
    pointsRef.current.forEach(point => {
      const canvasX = point.x + ctx.canvas.width / 2;
      const canvasY = point.y + ctx.canvas.height / 2;

      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const animate = (timestamp) => {
    if (!canvasRef.current) return;

    // Calculate time since last frame
    const frameInterval = 1000 / fps;
    const delta = timestamp - lastFrameTimeRef.current;

    // Only update if enough time has passed
    if (delta >= frameInterval) {
      const ctx = canvasRef.current.getContext('2d');

      // Increment iteration counter
      iterationRef.current += 1;

      // Get new points based on the selected animation
      const newPoints = pointsRef.current.map((_, index) => {
        return animations[selectedAnimation](iterationRef.current, index, maxDots, radius, speed);
      });

      pointsRef.current = newPoints;
      setPoints(newPoints);

      drawPoints(ctx);
      lastFrameTimeRef.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

    // Reset points and iteration counter
    const newPoints = initializePoints(maxDots, radius);
    pointsRef.current = newPoints;
    setPoints(newPoints);
    iterationRef.current = 0;
    lastFrameTimeRef.current = 0;

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedAnimation, maxDots, fps, radius, speed]);

  return (
    <div className="animation-previewer">
      <div className="controls" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Animation: </label>
          <select
            value={selectedAnimation}
            onChange={(e) => setSelectedAnimation(e.target.value)}
          >
            {Object.keys(animations).map(anim => (
              <option key={anim} value={anim}>
                {anim}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Number of points: </label>
          <input
            type="number"
            min="3"
            max="100"
            value={maxDots}
            style={{ width: '60px' }}
            onChange={(e) => {
              const value = Math.min(100, Math.max(3, Number(e.target.value)));
              setMaxDots(value);
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Radius: </label>
          <input
            type="number"
            min="10"
            max="200"
            value={radius}
            style={{ width: '60px' }}
            onChange={(e) => {
              const value = Math.min(200, Math.max(10, Number(e.target.value)));
              setRadius(value);
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Speed: </label>
          <input
            type="number"
            min="0.01"
            max="0.2"
            step="0.01"
            value={speed}
            style={{ width: '60px' }}
            onChange={(e) => {
              const value = Math.min(0.2, Math.max(0.01, Number(e.target.value)));
              setSpeed(value);
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>FPS: {fps}</label>
          <input
            type="range"
            min="1"
            max="60"
            value={fps}
            onChange={(e) => setFps(Number(e.target.value))}
          />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          margin: '20px',
          background: '#111'
        }}
      />
    </div>
  );
};

export default AnimationPreviewer; 