import type { TourStation } from "@/types/tour";

interface TopBarProps {
  currentStation: TourStation;
  totalStations: number;
  isAutorotating: boolean;
  onToggleDrawer: () => void;
  onToggleInfo: () => void;
  onToggleAutorotate: () => void;
  onToggleFullscreen: () => void;
  onToggleOverview?: () => void;
}

export function TopBar({
  currentStation,
  totalStations,
  isAutorotating,
  onToggleDrawer,
  onToggleInfo,
  onToggleAutorotate,
  onToggleFullscreen,
  onToggleOverview,
}: TopBarProps) {
  const currentIndexStr = String(currentStation.index + 1).padStart(2, "0");
  const totalStr = String(totalStations).padStart(2, "0");

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="btn-icon"
          onClick={onToggleDrawer}
          title="Abrir índice de estaciones"
          aria-label="Toggle Station Index"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="btn-label-desktop">Estaciones</span>
        </button>

        <div className="topbar-identity">
          <span className="topbar-brand">MINERA 360</span>
          <span className="topbar-divider">/</span>
          <span className="topbar-station-name">{currentStation.name}</span>
        </div>
      </div>

      <div className="topbar-center">
        <span className="telemetry-badge">
          LOC {currentIndexStr} / {totalStr}
        </span>
      </div>

      <div className="topbar-right">
        {onToggleOverview && (
          <button
            type="button"
            className="btn-action"
            onClick={onToggleOverview}
            title="Ver presentación"
          >
            Info
          </button>
        )}

        {currentStation.videoUrl && (
          <button
            type="button"
            className="btn-action highlight"
            onClick={onToggleInfo}
            title="Ver video explicativo"
            aria-label="Ver video explicativo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Ficha & Video</span>
          </button>
        )}

        <button
          type="button"
          className={`btn-icon ${isAutorotating ? "active" : ""}`}
          onClick={onToggleAutorotate}
          title={isAutorotating ? "Detener giro" : "Iniciar autorrotación"}
          aria-label="Toggle auto rotation"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
          </svg>
        </button>

        <button
          type="button"
          className="btn-icon"
          onClick={onToggleFullscreen}
          title="Pantalla completa"
          aria-label="Toggle Fullscreen"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
      </div>
    </header>
  );
}
