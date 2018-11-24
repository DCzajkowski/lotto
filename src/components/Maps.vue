<template>
    <div ref="map" style="width:100vw; height:100vh"></div>
</template>


<style>
.marker{
  width:100px;
  height:100px;
  background-color:red;
  border-radius: 50%;
  border: 5px solid red;
  background-size: cover;
  background-position: center center;
  transition: all 0.4s ease-in-out;
}
.marker-expanded{
  width:100vw;
  height:100vh;
  border-radius: 0;
  border: 0;
}
</style>

<script>
export default {
  props: [""],
  data() {
    return {
      platform: null,
      map: null
    };
  },
  methods: {
    initMaps() {
      this.platform = new window.H.service.Platform({
        app_id: "devportal-demo-20180625",
        app_code: "9v2BkviRwi9Ot26kp2IysQ",
        useHTTPS: true
      });
      const pixelRatio = window.devicePixelRatio || 1;
      const defaultLayers = this.platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
      });

      console.log(defaultLayers);

      this.map = new window.H.Map(
        this.$refs.map,
        defaultLayers.terrain.panorama,
        {
          center: { lat: 52.06, lng: 19.25 },
          zoom: 5.75,
          pixelRatio: pixelRatio
        }
      );
    },

    addSingleMarker(url, lat, lng){
      const icon =
        '<div class="marker" style="background-image: url(\'' +
        url +
        "')\"></div>";

      const myFunction = function() {
        if (this.className === "marker") {
          this.className += " marker-expanded";
        } else {
          this.className = "marker";
        }
      };

      const domIcon = new H.map.DomIcon(icon, {
        // the function is called every time marker enters the viewport
        onAttach: function(clonedElement, domIcon, domMarker) {
          clonedElement.addEventListener("click", myFunction, false);
        }
      });

      const coords = { lat, lng };
      const domMarker = new window.H.map.DomMarker(coords, {icon: domIcon})
      return domMarker;
      // group.addObject(domIcon);
    },
    addMarkersAndSetViewBounds() {
      const group = new window.H.map.Group();
      const marker = this.addSingleMarker('http://www.shomler.com/calsj/image02/4d9_4644.jpg', 52.06, 19.25);

      this.map.addObject(marker);

      // get geo bounding box for the group and set it to the map
      // this.map.setViewBounds(group.getBounds());
    }
  },
  mounted() {
    this.initMaps();
    this.addMarkersAndSetViewBounds();
  },
  created() {}
};
</script>
