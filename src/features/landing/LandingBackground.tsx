const particles = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 17 + 7) % 100}%`,
  top: `${(index * 23 + 11) % 100}%`,
  size: index % 3 === 0 ? 2 : 1,
  opacity: 0.15 + (index % 5) * 0.08,
}));

export function LandingBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020817]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_8%_-5%,rgba(75,140,255,0.34)_0%,rgba(75,140,255,0.08)_32%,transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_15%,rgba(140,184,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(75,140,255,0.06)_0%,transparent_38%,rgba(2,8,23,0.4)_100%)]" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
