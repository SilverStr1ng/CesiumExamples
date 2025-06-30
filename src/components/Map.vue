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
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    animation: false,
  })

  window.__viewer = viewer

  // 添加地形
  const terrain = await Cesium.CesiumTerrainProvider.fromIonAssetId(1)
  viewer.terrainProvider = terrain

  // 开启光照
  viewer.scene.globe.enableLighting = true

})
</script>

<style scoped></style>