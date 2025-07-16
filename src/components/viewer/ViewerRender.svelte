<script lang="ts">
  import { createViewer } from "@/services/viewerService.svelte";
    import type { Viewer } from "@photo-sphere-viewer/core";
    import { getImageIndexStore, imageData } from "@stores/ImageIndexStore.svelte";
    import { onMount } from "svelte";

    const imageIndexStore = getImageIndexStore();
    const viewerElement = document.getElementById("viewer");

    let ActualImage = imageData[imageIndexStore.actual];
    let PreviousImage = imageData[imageIndexStore.previous];
    if (imageIndexStore.actual + 1 >= imageData.length) {
        imageIndexStore.actual = 0;
    }
    let NextImage = imageData[imageIndexStore.actual + 1];

    let viewer: Viewer | null = createViewer(
        ActualImage.type,
        viewerElement,
        ActualImage.sourceUrl
    );
    let nextViewer: Viewer | null = createViewer(
        NextImage.type,
        viewerElement,
        NextImage.sourceUrl
    );


</script>


<article>
    <div id="viewer" class="viewer"></div>
</article>