<template>
    
    <div ref="timer" class="timer">

        <div class="minutes" v-bind:class="[ seconds < 55 && seconds % 2 ? 'alert' : '']">

            {{minutes}}
        </div>

            <div class="colon" >
                :
            </div>



        <div class="seconds" v-bind:class="[seconds < 55 && seconds % 2 ? 'alert' : '']">

            {{seconds}}
        </div>



    </div>
</template>


<script>
export default {
  data() {
    return {
      minutes: '',
      seconds: '',
      start: 0,
      end: 0,



      timer:"",
      wordString: {},
      interval: "",
      message:"",
      statusType:"",
      statusText: ""



    };
  },

  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired;
        this.statusType = "expired";
        this.statusText = this.wordString.status.expired;
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        // this.message = this.wordString.running;
        this.statusType = "running";
        // this.statusText = this.wordString.status.running;
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.message = this.wordString.upcoming;
        this.statusType = "upcoming";
        this.statusText = this.wordString.status.upcoming;
      }
    },

    calcTime: function(dist){
      // Time calculations for days, hours, minutes and seconds
        this.minutes = (Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0')
        this.seconds = Math.floor((dist % (1000 * 60)) / 1000).toString().padStart(2, '0')
    }



  },

  created() {
    this.start = new Date()

    // TODO: this.starttime
    this.end = new Date(1573387929*1000)

    setInterval(() => {this.timerCount(this.start, this.end)}, 1000)


  }
};
</script>



<style>

* {
    font-size: 27px;
}


.minutes, .seconds {
    background-color: floralwhite;
    border: 1px solid #ffcc00;
    color: #1e1e24;
    padding: 5px;
    border-radius: 3px;
    font-weight: 900;
}

.timer {
    flex-direction: row;
    display: flex;
}

.colon {
    padding: 5px;
}

.alert {
    color: rgb(207, 6, 19);




}


</style>
