<template>
  <div class="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      :controls="false"
      data-projection="EPSG:4326"
      class="map__container">
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"/>
      <vl-layer-image>
        <vl-source-image-static
          :size="gartenPlan.size"
          :extent="gartenPlan.extent"
          :projection="gartenPlan.projection"
          url="../assets/garten.png"
        />
      </vl-layer-image>
      <vl-geoloc
        :tracking="true"
        :tracking-options="{ enableHighAccuracy: true }"
        @update:position="geolocPosition = $event">
        <template
          slot-scope="geoloc">
          <vl-feature
            v-if="geoloc.position"
            id="position-feature">
            <vl-geom-point
              :coordinates="geoloc.position"/>
            <vl-style-box>
              <vl-style-icon
                :scale="0.25"
                :anchor="[0.5, 1]"
                src="../assets/marker-green.png"/>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm/>
      </vl-layer-tile>
    </vl-map>
    <div
      class="map__info">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}
    </div>
  </div>
</template>

<script>
import geolocation from '../lib/geolocation'
import {addProj, createProj} from 'vuelayers/lib/ol-ext'

export default {
  name: 'GardenMap',
  data () {
    const size = [624, 984]
    const extent = [0, 0, ...size]
    const customProjection = createProj({
      code: 'EPSG:4326',
      units: 'pixels',
      extent: extent,
      worldExtent: [11.417794443914175, 47.89767893271187, 11.418014325098195, 47.897471256658946],
      global: true,
      metersPerUnit: 1
    })

    addProj(customProjection)

    return {
      zoom: 15,
      center: [11.417923472761114, 47.89763465196907],
      rotation: 0,
      geolocPosition: getLocation(),
      gartenPlan: {
        size: size,
        extent: extent,
        projection: customProjection.getCode()
      }
    }
  }
}

function getLocation () {
  return geolocation()
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {

  }

  .map__container {
    height: 100vh;
    width: 100vw;
  }

  .map__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0.7, 0.7, 0.7, 0.7);
    color: white;
  }
</style>
