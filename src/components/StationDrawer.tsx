import type { TourStation } from "@/types/tour";
import { useEffect } from "preact/hooks";

interface StationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stations: TourStation[];
  currentIndex: number;
  onSelectStation: (index: number) => void;
}

export function StationDrawer({
  isOpen,
  onClose,
  stations,
  currentIndex,
  onSelectStation,
}: StationDrawerProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Índice de ubicaciones"
      >
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Índice del Tour</h2>
            <p className="drawer-subtitle">{stations.length} ubicaciones registradas</p>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Cerrar índice"
          >
            ×
          </button>
        </div>

        <ul className="drawer-list">
          {stations.map((station, i) => {
            const isActive = i === currentIndex;
            return (
              <li key={station.id}>
                <button
                  type="button"
                  className={`drawer-item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    onSelectStation(i);
                    onClose();
                  }}
                >
                  <div className="drawer-item-number">{String(i + 1).padStart(2, "0")}</div>
                  <div className="drawer-item-content">
                    <span className="drawer-item-cat">{station.category}</span>
                    <h3 className="drawer-item-name">{station.name}</h3>
                    <p className="drawer-item-desc">{station.description}</p>
                  </div>
                  {isActive && <span className="drawer-item-active-dot" />}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
