import type { TourStation } from "@/types/tour";

interface DockProps {
  stations: TourStation[];
  currentIndex: number;
  onSelectStation: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Dock({ stations, currentIndex, onSelectStation, onPrev, onNext }: DockProps) {
  return (
    <nav className="dock-container" aria-label="Navegación de escenas">
      <div className="dock-pill">
        <button
          type="button"
          className="dock-nav-btn"
          onClick={onPrev}
          title="Estación anterior"
          aria-label="Previous station"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="dock-stations-list">
          {stations.map((st, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={st.id}
                type="button"
                className={`dock-index-btn ${isActive ? "active" : ""}`}
                onClick={() => onSelectStation(i)}
                title={`${st.name} (${st.category})`}
                aria-current={isActive ? "step" : undefined}
              >
                <span>{i + 1}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="dock-nav-btn"
          onClick={onNext}
          title="Siguiente estación"
          aria-label="Next station"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
