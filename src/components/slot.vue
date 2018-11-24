<template>

<div>
<button @click='start'>start</button> 
<div class='slot-machine'> 
    

    <div class='slot' v-for='slot in slots' ref='slots' :key="slot.id"> 
        <h2>{{ slot.title }}</h2> 
        <div class='slot__window'> 
            <div class='slot__wrap'> 
                <div class='slot__item' :style="item.id == 7 ? 'border: 3px solid red' : ''"  :class="['gold', 'silver', 'bronze'][slot.id]" v-for='item in slot.items' :key="item.id">
                    


                    
                   
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
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 2,
          name: "Paula",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 3,
          name: "Dziemich",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 4,
          name: "Darek",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 5,
          name: "Michał",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 6,
          name: "Damian",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 7,
          name: "Ignac",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
        },
        {
          id: 8,
          name: "Aga",
          avatarUrl:
            "https://cnet1.cbsistatic.com/img/7RLL1MBOsWhYQfvWT5zH4mxt-8k=/970x0/2017/04/04/f2c69b6c-02b9-491d-8965-e6f7e5b1cc3a/avatar.jpg"
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
