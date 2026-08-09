import React, { useEffect, useState } from 'react';

const globalStyles = `
@keyframes rainFall {
  0% { transform: translateY(-10vh); }
  100% { transform: translateY(110vh); }
}
@keyframes floatUp {
  0% { transform: translateY(110vh) translateX(0px); }
  50% { transform: translateY(50vh) translateX(20px); }
  100% { transform: translateY(-10vh) translateX(-20px); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.1; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
@keyframes fallAndSpin {
  0% { transform: translateY(-10vh) rotate(0deg); }
  100% { transform: translateY(110vh) rotate(360deg); }
}
`;

const getParticleStyles = (type) => {
  const duration = Math.random() * 5 + 5; // 5~10s
  const delay = Math.random() * 5;
  const left = `${Math.random() * 100}%`;
  const top = `${Math.random() * 100}%`;
  
  if (type === 'rain') {
    return {
      left,
      top: `-${Math.random() * 20}vh`,
      width: '1px',
      height: `${Math.random() * 20 + 20}px`,
      backgroundColor: 'rgba(255,255,255,0.6)',
      animation: `rainFall ${Math.random() * 1 + 0.5}s linear ${delay}s infinite`
    };
  }
  if (type === 'leaves') {
    const colors = ['#e07a5f', '#f4a261', '#e9c46a', '#a64d79'];
    return {
      left,
      top: `-${Math.random() * 20}vh`,
      width: `${Math.random() * 10 + 10}px`,
      height: `${Math.random() * 10 + 10}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: '50% 0 50% 0',
      opacity: Math.random() * 0.5 + 0.5,
      animation: `fallAndSpin ${duration}s linear ${delay}s infinite`
    };
  }
  if (type === 'fireflies') {
    return {
      left,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 3}px`,
      height: `${Math.random() * 4 + 3}px`,
      backgroundColor: '#f1fa8c',
      borderRadius: '50%',
      boxShadow: '0 0 10px #f1fa8c, 0 0 20px #f1fa8c',
      animation: `floatUp ${duration + 5}s ease-in-out ${delay}s infinite, twinkle ${Math.random() * 3 + 2}s ease-in-out ${delay}s infinite`
    };
  }
  if (type === 'starlight') {
    return {
      left,
      top,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      backgroundColor: '#fff',
      borderRadius: '50%',
      boxShadow: '0 0 5px #fff',
      animation: `twinkle ${Math.random() * 3 + 1}s ease-in-out ${delay}s infinite`
    };
  }
  if (type === 'confetti') {
    const colors = ['#ff4d4f', '#ffc53d', '#73d13d', '#40a9ff', '#eb2f96'];
    return {
      left,
      top: `-${Math.random() * 20}vh`,
      width: `${Math.random() * 6 + 4}px`,
      height: `${Math.random() * 12 + 6}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.5,
      animation: `fallAndSpin ${duration}s linear ${delay}s infinite`
    };
  }
  
  // Default: Snow or Blossom
  return {
    left,
    top: `-${Math.random() * 20}vh`,
    width: `${Math.random() * 5 + 4}px`,
    height: `${Math.random() * 5 + 4}px`,
    backgroundColor: type === 'blossom' ? '#FFB7C5' : '#FFFFFF',
    borderRadius: '50%',
    opacity: Math.random() * 0.5 + 0.3,
    animation: `fallAndSpin ${duration}s linear ${delay}s infinite`
  };
};

const ParticlesOverlay = ({ type }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!type || type === 'none') {
      setParticles([]);
      return;
    }

    // Amount of particles based on type
    let count = 20;
    if (type === 'rain') count = 40;
    if (type === 'starlight') count = 30;
    if (type === 'confetti') count = 35;

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      style: getParticleStyles(type)
    }));

    setParticles(newParticles);
  }, [type]);

  if (!type || type === 'none') return null;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        overflow: 'hidden', pointerEvents: 'none', zIndex: 5
      }}>
        {particles.map(p => (
          <div key={p.id} style={{ position: 'absolute', ...p.style }} />
        ))}
      </div>
    </>
  );
};

export default ParticlesOverlay;
