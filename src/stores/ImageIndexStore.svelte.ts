
import PlacesData from "@data/images.json";

export const imageData = PlacesData.map((value) => ({
  place: value.name,
  sourceUrl: value.source_url,
  type: value.type,
}));

const imageIndexStore = $state(
    {
        actual: 0,
        previous: 0,
    }
)

export function changeImageIndex(index: number) {
    if (index < 0 || index >= imageData.length) {
      return;
    }
    imageIndexStore.previous = imageIndexStore.actual;
    imageIndexStore.actual = index;
}

export function getImageIndexStore() {
    return imageIndexStore;
}