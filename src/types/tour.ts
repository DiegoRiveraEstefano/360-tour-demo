export type StationType = "image" | "video";

export interface TourStation {
  id: string;
  index: number;
  name: string;
  category: string;
  description: string;
  panoramaUrl: string;
  type: StationType;
  videoUrl?: string;
  badge?: string;
}

export interface ViewerOptions {
  autorotate?: boolean;
  autorotateSpeed?: string | number;
  navbar?: boolean | string;
  caption?: string;
  minFov?: number;
  maxFov?: number;
  defaultFov?: number;
  defaultZoomLvl?: number;
}
