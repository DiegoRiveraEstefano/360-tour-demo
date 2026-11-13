import type { TourStation } from "@/types/tour";
import { useEffect } from "preact/hooks";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: TourStation;
}

export function InfoModal({ isOpen, onClose, station }: InfoModalProps) {
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
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="telemetry-badge">{station.category}</span>
            <h2 id="modal-title" className="modal-title">
              {station.name}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {station.videoUrl ? (
            <div className="modal-video-wrapper">
              <video controls autoPlay playsInline className="modal-video" onEnded={onClose}>
                <source src={station.videoUrl} type="video/mp4" />
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>
          ) : (
            <div className="modal-no-video">
              No hay material audiovisual complementario para esta estación.
            </div>
          )}

          <div className="modal-info-meta">
            <h4 className="modal-meta-label">Resumen Técnico</h4>
            <p className="modal-meta-desc">{station.description}</p>
          </div>
        </div>

        <div className="modal-footer">
          <span className="modal-tip">
            Presiona [ESC] o haz clic afuera para volver al visor 360°
          </span>
          <button type="button" className="btn-action" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
