<template>
  <div>
    <menubar/>
    <div class="nagroda" :class="$store.state.photo ? 'nagroda-hidden' : ''" > Oni już wygrali!</div>
    <div :class="$store.state.expanded ? 'overlay': ''" @click.stop="hideWhitebox">
      <maps />
    </div>
    <whitebox class='box'>
      <timer />

      <div v-if="$store.state.phase === 0" @click="startTask" class='join'> Rozpocznij zadanie za
        <div class="tickets">
          <p class="ticketnr">1</p>
          <span class="ticket"/>
        </div>
      </div>

      <!-- <div v-else-if="$store.state.phase === 1" class='description'> -->
        <div v-else-if="$store.state.phase === 1" class='task'> 
          <p class='tekst'>Sfotografuj zółty samochód</p> 
          <div class='aparat'></div>
        </div>

        <div v-else-if="$store.state.phase === -1" class='task'> 
          <div class="zakupy" @click="buy(1)">
            <p class="lol">2zł</p>
            <div class="tickets">
                <p class="ticketnr">1</p>  
                <span class="ticket"/>  
            </div>
          </div>
          <div class="zakupy" @click="buy(6)">
            <p class="lol">10zł</p>
            <div class="tickets">
                <p class="ticketnr">6</p>  
                <span class="ticket"/>  
            </div>
          </div>
        </div> 

        <!-- <div v-else-if="$store.state.phase === 2" class='task'> 
          <p class='tekst'>Sfotografuj zółty samochód</p> 
          <div class='aparat'></div>
        </div>  -->

        <div class='footer'>Pula: {{$store.state.prize}}zł</div>
      </whitebox>
    </div>
</template>


<style>
body{
  height: 100vh;
  overflow: hidden;
}
.lol{
  font-size: 20px;
  font-weight: 700;
  color:#f78d1d;
}
.zakupy{
  align-items: center;
  width: 280px;
  height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px #f78d1d;
  display: flex;
  justify-content: space-between;
  font-size: 12px !important; 
}

.footer{
  position: absolute;
  bottom: 0px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
}
.aparat{
  height: 80px;
  margin: 10px auto;
  background-image: url('../assets/mono-gtk-camera.svg');
  background-position: center, center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: slide_in 1s ease;
  position: relative;
}
.tekst{
  position: relative;
  font-size: 22px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  animation: slide_in 1s ease;
}
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
.ticketnr{
  margin: 0 6px;
}
.ticket{
  margin: 0px;
}
.box{
  padding: 5px 0;
  display: flex;
  justify-content: center
}
.opis{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 75px;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  padding: 5px 20px;
  transform: translateX(-50%);
  left: 50%;
  width: 180px;
}
.task{
  position: absolute;
  top: 110px;
  padding: 10px;
  width: 320px;
  /* border: 1px solid rgb(220,220,220); */
  border-radius: 10px;
  height: 140px;
}
.join{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 110px;
  padding: 10px;
  font-size: 25px;
  font-weight: 700;
  color: #f78d1d;
  border-radius: 30px;
  padding: 5px 20px;
  -webkit-box-shadow: 0 0 0 0 rgba(247, 149, 29, 0.4);
  box-shadow: 0 0 0 0 rgba(247, 149, 29, 0.4);
  -webkit-animation: pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
  margin-top: 32px;
}
@keyframes slide_in{
  0% {
    top:-20px;
    opacity: 0;
  }
  100% {
    top:0px;
    opacity: 1;
  }
}
@keyframes pulse{
  50% {
    -webkit-box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
}

</style>
<script>
// @ is an alias to /src
import Maps from "@/components/Maps.vue";
import Menubar from "@/components/Menubar.vue";
import Whitebox from "@/components/Whitebox.vue";
import Timer from "@/components/Timer.vue";

export default {
  name: "home",
  components: {
    Maps,
    Menubar,
    Whitebox,
    Timer
  },
  methods: {
    hideWhitebox(){
        console.log('adasd')
        this.$store.state.expanded = false;
    },
    incrementPrize(){
        this.$store.state.prize += Math.round(Math.random() * 60)
        setTimeout(this.incrementPrize, Math.round(Math.random() * 800));
    },
    startTask(){
      console.log('cos')
      if (this.$store.state.tickets > 0){
        this.$store.state.phase+=1
        this.$store.state.tickets-=1
      }else{
        this.old = this.$store.state.phase
        this.$store.state.phase-=1
      }
    },
    buy(ilosc){
      this.$store.state.tickets+=ilosc
      // this.$store.state.phase = this.$store.state.old
    }
  },
  mounted(){
    this.incrementPrize();
  }

};
</script>
