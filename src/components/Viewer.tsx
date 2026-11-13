import { type ViewerInstance, initViewer } from "@/services/viewer";
import { useEffect, useRef } from "preact/hooks";

interface ViewerProps {
  panoramaUrl: string;
  onViewerReady?: (instance: ViewerInstance) => void;
  className?: string;
}

export function Viewer({ panoramaUrl, onViewerReady, className }: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ViewerInstance | null>(null);
  const currentUrlRef = useRef<string>(panoramaUrl);
  const onViewerReadyRef = useRef(onViewerReady);
  onViewerReadyRef.current = onViewerReady;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Initialize viewer once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const instance = initViewer(containerRef.current, panoramaUrl, () => {
      if (onViewerReadyRef.current) {
        onViewerReadyRef.current(instance);
      }
    });

    instanceRef.current = instance;
    currentUrlRef.current = panoramaUrl;

    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current && panoramaUrl !== currentUrlRef.current) {
      currentUrlRef.current = panoramaUrl;
      instanceRef.current.setPanorama(panoramaUrl);
    }
  }, [panoramaUrl]);

  return (
    <div
      ref={containerRef}
      className={className || "viewer-canvas"}
      aria-label="360 Panorama Viewport"
    />
  );
}
