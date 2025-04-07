
import { useEffect, useRef } from "react";

const FloatingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Create stars
    const stars: { x: number; y: number; size: number; speed: number; brightness: number; pulsing: boolean }[] = [];
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2 + 0.1,
          brightness: Math.random() * 0.8 + 0.2,
          pulsing: Math.random() > 0.7,
        });
      }
    };

    createStars();

    // Animation loop
    let animationFrame: number;
    let lastTime = 0;
    let time = 0;
    
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Update star position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Calculate brightness for pulsing stars
        let brightness = star.brightness;
        if (star.pulsing) {
          brightness *= 0.7 + 0.3 * Math.sin(time / 1000 * (i % 5 + 1));
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 230, 255, ${brightness})`;
        ctx.fill();
        
        // For some brighter stars, add glow
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 230, 255, ${brightness * 0.1})`;
          ctx.fill();
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default FloatingStars;
