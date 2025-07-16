import {
  EquirectangularAdapter,
  Viewer,
  type ViewerConfig,
} from "@photo-sphere-viewer/core";
import { EquirectangularVideoAdapter } from "@photo-sphere-viewer/equirectangular-video-adapter";
import { VideoPlugin } from "@photo-sphere-viewer/video-plugin";

// Common configuration options
const COMMON_OPTIONS: Partial<ViewerConfig> = {
  fisheye: true,
  sphereCorrection: { pan: 0, tilt: 0, roll: 0 },
  maxFov: 150,
  minFov: 90,
  navbar: "autorotate zoom download fullscreen",
  caption: "Texto descriptivo de la imagen",
  mousewheel: true,
  mousemove: true,
};

// Image-specific configuration
const IMAGE_OPTIONS: Partial<ViewerConfig> = {
  adapter: EquirectangularAdapter,
  panoData: (image) => ({
    fullWidth: image.width,
    fullHeight: Math.round(image.width / 2),
    croppedWidth: image.width,
    croppedHeight: image.height,
    croppedX: 0,
    croppedY: Math.round((image.width / 2 - image.height) / 2),
  }),
};

// Video-specific configuration
const VIDEO_OPTIONS: Partial<ViewerConfig> = {
  adapter: [
    EquirectangularVideoAdapter,
    {
      muted: true,
      autoplay: true,
    },
  ],
  plugins: [VideoPlugin],
};

function createImageViewer(container: HTMLElement, source: string) {
  return new Viewer({
    container,
    panorama: source,
    ...COMMON_OPTIONS,
    ...IMAGE_OPTIONS,
  });
}

function createVideoViewer(container: HTMLElement, source: string) {
  return new Viewer({
    container,
    panorama: { source },
    ...COMMON_OPTIONS,
    ...VIDEO_OPTIONS,
  });
}

export function createViewer(
  type: "image" | "video" = "image",
  container: HTMLElement,
  source: string
) {
  return type === "image"
    ? createImageViewer(container, source)
    : createVideoViewer(container, source);
}
