const App = () => {
  const [projectiles, setProjectiles] = React.useState([]);

  const projectileTypes = {
    throwingKnife: {
      width: 24,
      height: 120,
      svg: `<svg viewBox="0 0 24 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 10L13 10L13 110L11 110L11 10Z" fill="url(#metalGradient)"/>
        <path d="M8 8L16 8C18 8 19 9 19 11L19 20L5 20L5 11C5 9 6 8 8 8Z" fill="#A0A0A0"/>
        <path d="M9 4L15 4L17 8L7 8L9 4Z" fill="#808080"/>
        <path d="M11.5 0L14 4L9 4L11.5 0Z" fill="#606060"/>
        <path d="M12 110L13 110L16 116L8 116L11 110Z" fill="#909090"/>
        <path d="M8 116L16 116L14 120L10 120L8 116Z" fill="#707070"/>
        <defs>
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#B8B8B8;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#E8E8E8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#B8B8B8;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    }
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const startX = rect.width / 2;
    const startY = rect.height + 100;
    
    setProjectiles(prev => [...prev, {
      startX,
      startY,
      endX: x,
      endY: y,
      id: Date.now(),
      rotation: Math.random() * 1080 + 720
    }]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <button 
          onClick={() => setProjectiles([])}
          className="p-2 bg-red-500 text-white rounded"
        >
          Clear All
        </button>
      </div>

      <div 
        className="relative w-full aspect-video border-2 border-gray-300 rounded cursor-crosshair overflow-hidden bg-cover bg-center"
        onClick={handleClick}
        style={{
          backgroundImage: `url('https://i.imgur.com/lH1mWKH.jpg')`
        }}
      >
        {projectiles.map(projectile => (
          <div
            key={projectile.id}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: `${projectileTypes.throwingKnife.width}px`,
              height: `${projectileTypes.throwingKnife.height}px`,
              animation: `throw-${projectile.id} 0.8s cubic-bezier(.17,.67,.83,.67) forwards`,
            }}
            dangerouslySetInnerHTML={{ 
              __html: projectileTypes.throwingKnife.svg 
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        ${projectiles.map(p => `
          @keyframes throw-${p.id} {
            0% {
              transform: translate(${p.startX}px, ${p.startY}px) rotate(0deg) scale(0.8);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translate(${p.endX}px, ${p.endY}px) rotate(${p.rotation}deg) scale(1);
              opacity: 1;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
