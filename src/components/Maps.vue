<template>
    <div ref="map" style="width:100vw; height:100vh"></div>
</template>

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
          zoom:5.75,
          pixelRatio: pixelRatio
        }
      );
    },

    addMarkersAndSetViewBounds() {
      // create map objects
      // Add the first marker
      var svgMarkup = `<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <rect stroke="black" fill="blue" x="1" y="1" width="22" height="22" />
        <text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold"
        text-anchor="middle" fill="red" >C</text></svg>`;
      const bearsIcon = new H.map.Icon(svgMarkup);
      const toronto = new window.H.map.Marker(
          {
            lat: 50.052853,
            lng: 19.928001
          },
          { icon: bearsIcon }
        ),
        boston = new window.H.map.Marker({ lat: 51.9, lng: 19.5 }),
        washington = new window.H.map.Marker({ lat: 51.2, lng: 19.2 }),
        group = new window.H.map.Group();

      // add markers to the group
      group.addObjects([toronto, boston, washington]);
      this.map.addObject(group);

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
