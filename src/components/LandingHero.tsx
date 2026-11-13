interface LandingHeroProps {
  onStartTour: () => void;
  onOpenIndex: () => void;
  totalStations: number;
}

export function LandingHero({ onStartTour, onOpenIndex, totalStations }: LandingHeroProps) {
  return (
    <div className="hero-overlay">
      <div className="hero-card">
        <div className="hero-badge">PLATAFORMA INDUSTRIAL 360°</div>
        <h1 className="hero-title">
          Recorrido Virtual &<br />
          Inspección Inmersiva
        </h1>
        <p className="hero-description">
          Visualización panorámica de alta definición para instalaciones mineras y plantas de
          proceso. Explora estaciones críticas, sistemas de energía y líneas de producción en un
          entorno interactivo WebGL.
        </p>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{totalStations}</span>
            <span className="hero-stat-label">Estaciones 360°</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">4K</span>
            <span className="hero-stat-label">Equirectangular</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">60 FPS</span>
            <span className="hero-stat-label">WebGL Renderer</span>
          </div>
        </div>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onStartTour}>
            <span>Comenzar Recorrido</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
          <button type="button" className="btn-secondary" onClick={onOpenIndex}>
            Ver Lista de Ubicaciones
          </button>
        </div>
      </div>
    </div>
  );
}
