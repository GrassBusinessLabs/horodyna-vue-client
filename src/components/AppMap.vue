<template>
   <div class='map-container'>
      <div class='map-container__map' ref='mapContainer'></div>
   </div>
</template>

<script lang='ts' setup>
import { mapService } from '@/services/map.ts'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import { onMounted, onUnmounted, ref } from 'vue'

const map = mapService()
const mapContainer = ref<HTMLElement | null>(null)
const startingCoords: LngLatLike = {
   lat: 48.8622029334991,
   lng: 32.62480605898742
}

onMounted(async () => {
   if (mapContainer.value) {
      await new Promise(resolve => setTimeout(resolve, 200))
      await map.createMap(mapContainer.value as HTMLElement, {center: startingCoords})
   }
})

onUnmounted(() => {
   map.destroyMap()
})
</script>

<style lang='scss'>
.map-container {
   height: calc(100vh - 130px);
   &__map {
      width: 100%;
      height: 100%;
      overflow: hidden;
   }
}
.map-marker {
   width: 50px;
   height: 50px;
   background-size: cover;
}
</style>