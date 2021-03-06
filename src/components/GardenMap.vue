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

      <component
        v-for="layer in layers"
        v-if="layer.visible"
        :is="layer.cmp"
        :key="layer.id"
        v-bind="layer">
        <!-- add vl-source-* -->
        <component
          v-if="layer.source.staticFeatures && layer.source.staticFeatures.length"
          :is="layer.source.cmp"
          v-bind="layer.source">
          <!-- add static features to vl-source-vector if provided -->
          <vl-feature
            v-for="feature in layer.source.staticFeatures"
            :key="feature.id"
            :id="feature.id"
            :properties="feature.properties">
            <component
              :is="geometryTypeToCmpName(feature.geometry.type)"
              v-bind="feature.geometry"/>
          </vl-feature>

          <!-- add inner source if provided (like vl-source-vector inside vl-source-cluster) -->
          <component
            v-if="layer.source.source && layer.source.source.staticFeatures && layer.source.source.staticFeatures.length"
            :is="layer.source.source.cmp"
            v-bind="layer.source.source">
            <!-- add static features to vl-source-vector if provided -->
            <vl-feature
              v-for="feature in layer.source.source.staticFeatures"
              :key="feature.id"
              :id="feature.id"
              :properties="feature.properties">
              <component
                :is="geometryTypeToCmpName(feature.geometry.type)"
                v-bind="feature.geometry"/>
            </vl-feature>
          </component>
        </component>
      </component>

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
    // Custom projection for static Image layer
    let x = 1024 * 10000
    let y = 968 * 10000
    let imageExtent = [-x / 2, -y / 2, x / 2, y / 2]
    let customProj = createProj({
      code: 'xkcd-image',
      units: 'pixels',
      extent: imageExtent
    })
    // add to the list of known projections
    // after that it can be used by code
    addProj(customProj)

    return {
      zoom: 15,
      center: [11.417923472761114, 47.89763465196907],
      rotation: 0,
      geolocPosition: getLocation(),
      layers: [
        {
          id: 'static-image',
          title: 'Static Image with custom projection',
          cmp: 'vl-layer-image',
          visible: true,
          source: {
            cmp: 'vl-source-image-static',
            projection: customProj.getCode(),
            url: 'https://imgs.xkcd.com/comics/online_communities.png',
            size: [1024, 968],
            extent: imageExtent
          }
        }
      ]
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
