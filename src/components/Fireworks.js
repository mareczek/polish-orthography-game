import React, { useState, useEffect } from 'react';

// Komponent animacji fajerwerków
const Fireworks = () => {
  const [fireworks, setFireworks] = useState([]);

  // Funkcja tworząca nowy fajerwerk
  const createFirework = () => {
    const colors = [
      '#FF0000', // czerwony
      '#00FF00', // zielony
      '#0000FF', // niebieski
      '#FFFF00', // żółty
      '#FF00FF', // magenta
      '#00FFFF', // cyan
      '#FFA500', // pomarańczowy
      '#800080', // fioletowy
      '#FFC0CB', // różowy
      '#FFD700'  // złoty
    ];

    return {
      id: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 70,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 3 + Math.random() * 5,
      delay: Math.random() * 2
    };
  };

  useEffect(() => {
    // Tworzymy początkowe fajerwerki
    const initialFireworks = Array.from({ length: 20 }, createFirework);
    setFireworks(initialFireworks);

    // Dodajemy nowe fajerwerki co jakiś czas
    const interval = setInterval(() => {
      setFireworks(prev => {
        // Usuwamy stare fajerwerki, jeśli jest ich za dużo
        const filtered = prev.length > 30 ? prev.slice(prev.length - 30) : prev;
        return [...filtered, createFirework()];
      });
    }, 300);

    // Czyścimy po sobie
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.left}%`,
            top: `${firework.top}%`,
            '--color': firework.color,
            '--size': `${firework.size}px`,
            animationDelay: `${firework.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;