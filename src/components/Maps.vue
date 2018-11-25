<template>
      <div ref="map"  style="position:relative; width:100vw; height:100vh; z-index:0"></div> 
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
        
      const state = this.$store.state  
      const myFunction = function() {
        if (this.className === "marker") {
          this.className += " marker-expanded";
          state.photo = true;
        } else {
          this.className = "marker";
          state.photo = false;
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

      const marker2 = this.createMarker('https://notebooki.pl/16602-large_default/logitech-m720-triathlon-mouse-910-004791.jpg', 53.439540, 14.526695,1);
      const marker = this.createMarker('https://www.mycenter.pl/kupic_img9/89/280x280__mysz-bezprzewodowa-xiaomi-portable-mouse-gold_494400413.jpg', 50.121739, 20.027037,2);
      const marker3 = this.createMarker('https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3435/3435677_sa.jpg', 52.232278, 21.063353,3);
      const marker4 = this.createMarker('https://f01.esfr.pl/foto/6/8398573882/a1298a27b38cf3a5898b32faa5fc4d6b/tracer-ghost-le,8398573882_7.jpg', 54.381656, 18.646207,1);
      const marker5 = this.createMarker('https://f00.esfr.pl/foto/4/14518491129/43b0488f84312c80ccdfb3e4e8d5b00c/steelseries-rival-300-cs-go-hyper-beast-edition,14518491129_7.jpg', 50.021325, 21.963452,2);
      const marker6 = this.createMarker('https://f01.esfr.pl/foto/9/14189282985/981ec6323e55b8eba48f536ab24e74a0/logitech-m220-silent-szary,14189282985_7.jpg', 50.221067, 18.958526,3);


      this.map.addObjects([marker,marker2,marker3,marker4,marker5,marker6]);

      // get geo bounding box for the group and set it to the map
      // this.map.setViewBounds(group.getBounds());
    }
  },
  watch:{
    "$store.state.winners"(winners){
      console.log(winners);
      for(win in  winners){
        const marker = this.createMarker(winners[win].photoUrl,winners[win].latitude,winners[win].longitude, win+1)
        this.map.addObjects([marker]);
      }
    }
  },
  mounted() {
    this.initMaps();
    this.addMarkersAndSetViewBounds();
  },
  created() {}
};
</script>
