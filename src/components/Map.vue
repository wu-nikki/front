<template>
  <div ref="map" style="width: 400px; height: 400px;"></div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
const map = ref(null);
const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  }
});

onMounted(initMap)
function initMap() {
  const google = window.google;
  const latLng = new google.maps.LatLng(props.latitude, props.longitude);
  const mapOptions = {
    center: latLng,
    zoom: 15,
  };
  const mapInstance = new google.maps.Map(map.value, mapOptions);
  new google.maps.Marker({
    position: latLng,
    map: mapInstance,
  });
}
</script>