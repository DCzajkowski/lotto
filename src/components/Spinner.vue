<template>

<div>
<div class='slot-machine'> 
    

    <div class='slot' v-for='slot in slots' ref='slots' :key="slot.id"> 
        <h3>{{ slot.title }}</h3> 
        <div class='slot__window'> 
            <div class='slot__wrap'> 
                <div class='slot__item' :style="item.id == 4 ? 'border: 4px solid red; height: 72px; width:272px;' : '' " :class="['gold', 'silver', 'bronze'][slot.id]" v-for='item in slot.items' :key="item.id">
                    


                    
                   
                        <img id="avatar" :src="item.avatarUrl" alt="">

                    

                    <p class="playerName">
                        {{item.name}}
                        
                    </p>
                            
                        



                </div> 

                <div class='slot__item slot__item--copy' :class="['gold', 'silver', 'bronze'][slot.id]" >
                
                        <img id="avatar" :src="slot.items[0].avatarUrl" alt="">
                    <p class="playerName">
                        {{slot.items[0].name}}
                        
                    </p>


                    </div>
                </div> 
            </div> 
                    </div> 
                    </div>


</div>






</template>


<script>
const next =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(cb) {
    window.setTimeout(cb, 1000 / 60);
  };
export default {
  data: function() {
    return {
      items: [
        {
          id: 1,
          name: "Grzesiek",
          avatarUrl:
            "https://d-pt.ppstatic.pl/kadry/k/r/1/77/2c/59eeefcd5a1a6_o,size,969x565,q,71,h,487be1.jpg"
        },
        {
          id: 2,
          name: "Paula",
          avatarUrl:
            "https://euroimmun.pl/blog/wp-content/uploads/2017/10/Laboratorium-to-przede-wszystkim-ludzie-a-nie-sprzet-730x410.jpg"
        },
        {
          id: 3,
          name: "Dziemich",
          avatarUrl:
            "https://kph.org.pl/wp-content/uploads/2015/08/DSC_2337.jpg"
        },
        {
          id: 4,
          name: "Darek",
          avatarUrl:
            "https://www.impress.com.au/images/stories/Redflow/John-Lindsay-H.jpg"
        },
        {
          id: 5,
          name: "Michał",
          avatarUrl:
            "https://www.lechpoznan.pl/files/cache/e/2/c_960x585_e24f33a3da2903df7cab27387042a4951489411243.png"
        },
        {
          id: 6,
          name: "Damian",
          avatarUrl:
            "http://bi.im-g.pl/im/1/7250/z7250191IFR.jpg"
        },
        {
          id: 7,
          name: "Ignac",
          avatarUrl:
            "https://static.wirtualnemedia.pl/media/top/PiotrJaroszewski_655.jpg"
        },
        {
          id: 8,
          name: "Aga",
          avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXLAiDXlK12gHCGUlTivRRc0KkZzxwsO9dVUICSLf3_ri2FeBDJgdata:image/jpeg;base64,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"
        },
        {
          id: 9,
          name: "Zosia",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 10,
          name: "Ela",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 11,
          name: "Kuba",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 12,
          name: "Karo",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        }
      ],
      slots: [
        {
          id: 0,
          title: "Winner",
          items: []
        },
        {
          id: 1,
          title: "Second",
          items: []
        },
        {
          id: 2,
          title: "Third",
          items: []
        }
      ],
      opts: null,
      startedAt: null
    };
  },
  created() {
    this.slots.forEach(slot => {
      slot.items = this.items;
    });
  },
  mounted(){
      this.start()
      setTimeout(() => {
          this.$store.state.animation = false
          this.$store.state.phase = 0
    },8000)
  },
  methods: {
    start: function() {
      if (this.opts) {
        return;
      }
      this.opts = this.slots.map((data, i) => {
        const slot = this.$refs.slots[i];
        const choice = Math.floor(Math.random() * data.items.length);
        console.log("choice", i, data.items[choice]);
        console.log("items: ", this.slots);
        const opts = {
          el: slot.querySelector(".slot__wrap"),
          finalPos: choice * 90,
          startOffset: 2000 + Math.random() * 500 + i * 500,
          height: data.items.length * 90,
          duration: 7000 - i * 1500, // milliseconds
          isFinished: false
        };
        return opts;
      });
      next(this.animate);
    },
    animate: function(timestamp) {
      if (this.startedAt == null) {
        this.startedAt = timestamp;
      }
      const timeDiff = timestamp - this.startedAt;
      this.opts.forEach(opt => {
        if (opt.isFinished) {
          return;
        }
        const timeRemaining = Math.max(opt.duration - timeDiff, 0);
        const power = 3;
        const offset =
          (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) *
          opt.startOffset;
        // negative, such that slots move from top to bottom
        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height);
        opt.el.style.transform = "translateY(" + pos + "px)";
        if (timeDiff > opt.duration) {
          console.log("finished", opt, pos, opt.finalPost);
          opt.isFinished = true;
        }
      });
      if (this.opts.every(o => o.isFinished)) {
        this.opts = null;
        this.startedAt = null;
        console.log("finished");
      } else {
        next(this.animate);
      }
    }
  }
};
</script>


<style>
.slot {
  /* float: left; */
  margin: 0.4em;
}
* {
  margin: 0px;
  padding: 0px;
  max-width: 100vw;
}
.slot__window {
  background-color: white;
  width: 300px;
  height: 100px;
  overflow: hidden;
  margin: auto;
}
.slot__wrap {
}
.slot__item {
  margin-top: 10px;
  width: 280px;
  height: 80px;
  padding: 0px 10px;
  /* text-align: center; */
  background-color: blue;
  color: white;
  border-radius: 20px;
  line-height: 90px;
  display: flex;
}
.slot__item--copy {
}
#avatar {
  align-self: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px;
  /* display: inline; */
}
.playerName {
  align-self: center;
  margin-left: 15px;
  display: inline-block;
  /* float: left; */
}
.gold {
  background-color: gold;
}
.silver {
  background-color: silver;
}
.bronze {
  background-color: brown;
}
</style>