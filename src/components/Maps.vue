<template>
      <div ref="map" style="position:relative; width:100vw; height:100vh; z-index:0"></div>
</template>


<style>
.marker{
  background-color:white;
  border-radius: 50%;
  border: 3px solid white;
  background-size: cover;
  background-position: center center;
  transition: all 0.4s ease-in-out;
  z-index: 0 !important;
}
.marker-expanded{
  width:100vw !important;
  height:100vh !important;
  border-radius: 0;
  border: 0;
  transform: none !important;
  z-index: 1 !important;
  /* background-size: contain;
  background-repeat: no-repeat; */
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
    createMarker(url, lat, lng, place){
      let size = 50;
      switch (place){
        case 1:
          size = 50;
          break;
        case 2:
          size = 35;
          break;
        case 3:
          size = 20;
          break;  
      }
      const icon = `<div class="marker" style="background-image: url('${url}'); width: ${size}px; height: ${size}px">`
        
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
    },
    addMarkersAndSetViewBounds() {
      const group = new window.H.map.Group();

      const marker2 = this.createMarker('https://blogs.nvidia.com/wp-content/uploads/2017/02/ai-podcast-social-tw-li-2048x1024.jpg', 53.439540, 14.526695,1);
      const marker = this.createMarker('http://www.shomler.com/calsj/image02/4d9_4644.jpg', 50.121739, 20.027037,2);
      const marker3 = this.createMarker('http://www.shomler.com/calsj/image02/4d9_4644.jpg', 52.232278, 21.063353,3);


      this.map.addObjects([marker,marker2,marker3]);

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
