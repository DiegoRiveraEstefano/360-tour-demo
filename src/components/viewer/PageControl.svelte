<script lang="ts">
  
  import {imageData, changeImageIndex, getImageIndexStore} from "@stores/ImageIndexStore.svelte";

  let { changeImage } = $props();
</script>

<section class="absolute z-30 bottom-8 w-full">
  <nav
    class="gap-4 sticky flex shadow justify-center items-center bg-gradient-to-t from-black via-gray-800 to-transparent bg-opacity-70 p-4 rounded-md"
  >
    {#each imageData as item, index (index)}
      <div class="flex overflow-x-auto">
        <button
          type="button"
          class="z-40 transition transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-full w-12 h-12 flex items-center justify-center bg-white bg-opacity-70 border border-indigo-400 text-indigo-800 font-medium"
          onclick={() => changeImage(index)}
        >
          {index + 1}
        </button>
      </div>
    {/each}
  </nav>
</section>