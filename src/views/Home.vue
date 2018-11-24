<template>
    <div>
      <menubar/>
      <Maps/>
    </div>
</template>



<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Menubar from "@/components/Menubar.vue";

export default {
  name: "home",
  components: {
    Maps,
    Menubar
  }

};
</script>
