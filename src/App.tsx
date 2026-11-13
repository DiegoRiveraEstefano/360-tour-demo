import { Dock } from "@/components/Dock";
import { InfoModal } from "@/components/InfoModal";
import { LandingHero } from "@/components/LandingHero";
import { StationDrawer } from "@/components/StationDrawer";
import { TopBar } from "@/components/TopBar";
import { Viewer } from "@/components/Viewer";
import { STATIONS } from "@/data/stations";
import type { ViewerInstance } from "@/services/viewer";
import { useCallback, useEffect, useState } from "preact/hooks";

export function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewer, setViewer] = useState<ViewerInstance | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [isAutorotating, setIsAutorotating] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);

  const currentStation = STATIONS[currentIndex];

  const handleSelectStation = useCallback(
    (index: number) => {
      const target = (index + STATIONS.length) % STATIONS.length;
      setCurrentIndex(target);
      if (viewer) {
        viewer.setPanorama(STATIONS[target].panoramaUrl);
      }
    },
    [viewer]
  );

  const handlePrev = useCallback(() => {
    handleSelectStation(currentIndex - 1);
  }, [currentIndex, handleSelectStation]);

  const handleNext = useCallback(() => {
    handleSelectStation(currentIndex + 1);
  }, [currentIndex, handleSelectStation]);

  const handleToggleAutorotate = useCallback(() => {
    if (viewer) {
      const active = viewer.toggleAutorotate();
      setIsAutorotating(active);
    }
  }, [viewer]);

  const handleToggleFullscreen = useCallback(() => {
    if (viewer) {
      viewer.toggleFullscreen();
    }
  }, [viewer]);

  // Global keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Avoid firing if inside an input or editable field
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "f" || e.key === "F") {
        handleToggleFullscreen();
      } else if (e.key === "i" || e.key === "I") {
        setIsDrawerOpen((prev) => !prev);
      } else if (e.key === "v" || e.key === "V") {
        if (currentStation.videoUrl) {
          setIsInfoOpen((prev) => !prev);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleToggleFullscreen, currentStation]);

  return (
    <div className="app-container">
      {/* 360 Canvas Viewport */}
      <Viewer
        panoramaUrl={currentStation.panoramaUrl}
        onViewerReady={(instance) => setViewer(instance)}
      />

      {/* Persistent UI Overlays */}
      <TopBar
        currentStation={currentStation}
        totalStations={STATIONS.length}
        isAutorotating={isAutorotating}
        onToggleDrawer={() => setIsDrawerOpen(true)}
        onToggleInfo={() => setIsInfoOpen(true)}
        onToggleAutorotate={handleToggleAutorotate}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleOverview={() => setShowOverview(true)}
      />

      <Dock
        stations={STATIONS}
        currentIndex={currentIndex}
        onSelectStation={handleSelectStation}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Slide-out Locations Drawer */}
      <StationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        stations={STATIONS}
        currentIndex={currentIndex}
        onSelectStation={handleSelectStation}
      />

      {/* Explanatory Video & Telemetry Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        station={currentStation}
      />

      {/* Overview / Landing Intro Card */}
      {showOverview && (
        <LandingHero
          totalStations={STATIONS.length}
          onStartTour={() => setShowOverview(false)}
          onOpenIndex={() => {
            setShowOverview(false);
            setIsDrawerOpen(true);
          }}
        />
      )}
    </div>
  );
}
