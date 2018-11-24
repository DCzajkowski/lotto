<template>
    <div>
      <menubar/>
      <div class="nagroda" :class="$store.state.photo ? 'nagroda-hidden' : ''" > Oni już wygrali!</div>
      <div :class="$store.state.expanded ? 'overlay': ''" @click.stop="hideWhitebox">
        <maps />
      </div>
      <whitebox/>
    </div>
</template>


<style>
.overlay{
  position: relative;
  width:100vw;
  z-index: 1;
}
.nagroda{
  position: absolute;
  top: 120px;
  width: 250px;
  height: 40px;
  left: calc(50% - 125px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 1px 1px 0px black;
  opacity: 1;
  transition: opacity 0.4s ease;
}
.nagroda-hidden{
  opacity: 0;
}
</style>
<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Menubar from "@/components/Menubar.vue";
import Whitebox from "@/components/Whitebox.vue";

export default {
  name: "home",
  components: {
    Maps,
    Menubar,
    Whitebox
  },
  methods: {
    hideWhitebox(){
        console.log('adasd')
        this.$store.state.expanded = false;
    },
    incrementPrize(){
        this.$store.state.prize += Math.round(Math.random() * 60)
        setTimeout(this.incrementPrize, Math.round(Math.random() * 800));  
    }
  },
  mounted(){
    this.incrementPrize();
  }

};
</script>
