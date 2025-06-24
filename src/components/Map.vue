<template>
  <div id="container">

  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { onMounted } from 'vue';

// set Cesium token
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN

onMounted(async () => {
  const viewer = new Cesium.Viewer("container", {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })

  window.__viewer = viewer
})
</script>

<style scoped></style>