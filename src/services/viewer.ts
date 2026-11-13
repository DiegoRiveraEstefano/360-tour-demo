import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import { EquirectangularAdapter, Viewer, type ViewerConfig } from "@photo-sphere-viewer/core";

export interface ViewerInstance {
  setPanorama: (url: string) => Promise<void>;
  toggleAutorotate: () => boolean;
  isAutorotate: () => boolean;
  toggleFullscreen: () => void;
  destroy: () => void;
  getRawViewer: () => Viewer;
}

export function initViewer(
  container: HTMLElement,
  initialPanorama: string,
  onReady?: () => void
): ViewerInstance {
  const config: ViewerConfig = {
    container,
    panorama: initialPanorama,
    adapter: EquirectangularAdapter,
    navbar: false, // Custom minimal UI controls are used
    fisheye: false,
    mousewheel: true,
    mousemove: true,
    moveSpeed: 1.2,
    zoomSpeed: 1.5,
    minFov: 30,
    maxFov: 90,
    defaultZoomLvl: 50,
    plugins: [
      [
        AutorotatePlugin,
        {
          autostartDelay: 0,
          autostartOnIdle: false,
          autorotateSpeed: "1.2rpm",
        },
      ],
    ],
    panoData: (image) => {
      const fullHeight = Math.round(image.width / 2);
      const croppedY = Math.max(0, Math.round((fullHeight - image.height) / 2));
      return {
        fullWidth: image.width,
        fullHeight,
        croppedWidth: image.width,
        croppedHeight: image.height,
        croppedX: 0,
        croppedY,
      };
    },
  };

  const viewer = new Viewer(config);
  let autorotatePlugin: AutorotatePlugin | null = null;

  viewer.addEventListener(
    "ready",
    () => {
      autorotatePlugin = viewer.getPlugin(AutorotatePlugin) as AutorotatePlugin | null;
      if (autorotatePlugin) {
        autorotatePlugin.stop();
      }
      if (onReady) {
        onReady();
      }
    },
    { once: true }
  );

  return {
    async setPanorama(url: string) {
      try {
        await viewer.setPanorama(url, {
          showLoader: false,
          transition: true,
        });
      } catch (err) {
        console.error("Failed to transition panorama:", err);
      }
    },
    toggleAutorotate() {
      if (!autorotatePlugin) {
        autorotatePlugin = viewer.getPlugin(AutorotatePlugin) as AutorotatePlugin | null;
      }
      if (autorotatePlugin) {
        autorotatePlugin.toggle();
        return autorotatePlugin.isEnabled();
      }
      return false;
    },
    isAutorotate() {
      if (!autorotatePlugin) {
        autorotatePlugin = viewer.getPlugin(AutorotatePlugin) as AutorotatePlugin | null;
      }
      return autorotatePlugin ? autorotatePlugin.isEnabled() : false;
    },
    toggleFullscreen() {
      if (viewer.isFullscreenEnabled()) {
        viewer.exitFullscreen();
      } else {
        viewer.enterFullscreen();
      }
    },
    destroy() {
      try {
        viewer.destroy();
      } catch (err) {
        console.warn("Viewer destruction warning:", err);
      }
    },
    getRawViewer() {
      return viewer;
    },
  };
}
