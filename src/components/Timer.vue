<template>
  <div ref="timer" class="timer" :class="$store.state.expanded ? 'timer-big':''">
    <div class="minutes" :class="[minutes == 0 && seconds < 30 && seconds % 2 ? 'alert' : '']">
      {{ minutes }}
    </div>

    <div class="colon">:</div>

    <div class="seconds" :class="[minutes == 0 && seconds < 30 && seconds % 2 ? 'alert' : '']">
      {{ seconds }}
    </div>
  </div>
</template>

<script>
  export default {
    // props: ['starttime'],
    data() {
      return {
        // minutes: '',
        // seconds: '',
        // start: 0,
        // end: 0,
        // timer:'',
        // wordString: {},
        // interval: '',
        // message:'',
        // statusType:'',
        // statusText: '',
        secondsRemaining: 0,
      }
    },
    computed: {
      minutes() {
        const minute = Math.floor(this.secondsRemaining / 60)

        if (minute < 10) {
          return `0${minute}`
        }

        return minute
      },
      seconds() {
        const second = this.secondsRemaining % 60

        if (second < 10) {
          return `0${second}`
        }

        return second
      },
    },
    methods: {
      // timerCount(start, end) {
      //   // Get todays date and time
      //   let now = new Date().getTime()
      //   // Find the distance between now an the count down date
      //   let distance = start - now
      //   let passTime = end - now

      //   if (distance < 0 && passTime < 0) {
      //     this.message = this.wordString.expired
      //     this.statusType = "expired"
      //     this.statusText = this.wordString.status.expired
      //     clearInterval(this.interval)

      //     return
      //   } else if (distance < 0 && passTime > 0) {
      //     this.calcTime(passTime)
      //     this.statusType = "running"
      //   } else if (distance > 0 && passTime > 0) {
      //     this.calcTime(distance)
      //     this.message = this.wordString.upcoming
      //     this.statusType = "upcoming"
      //     this.statusText = this.wordString.status.upcoming
      //   }
      // },
      // calcTime(dist) {
      //   // Time calculations for days, hours, minutes and seconds
      //   this.minutes = (Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0')
      //   this.seconds = Math.floor((dist % (1000 * 60)) / 1000).toString().padStart(2, '0')
      // },
      getSecondsRemaining() {
        const currentMinute = new Date().getMinutes()

        let finishDate = new Date()
        finishDate = new Date(finishDate.setMinutes(currentMinute + 5 - Math.floor(currentMinute % 5)))
        finishDate = finishDate.setSeconds(0)

        return Math.floor((finishDate - Date.now()) / 1000)
      },
    },
    created() {
      // this.start = new Date()
      // this.end = new Date((Date.now() + 5 * 60) * 1000)
      // this.end.setMinutes()

      setInterval(() => {
        this.secondsRemaining = this.getSecondsRemaining()
      }, 1000)
    },
  }
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
  border-radius: 6px;
  font-weight: 900;
}
.timer {
  flex-direction: row;
  display: flex;
  height: 50px;
  transform: scale(1,1);
  transition: all 0.4s ease-in-out;
}
.timer-big{
  transform: scale(1.8,1.8);
}
.colon {
  padding: 5px;
}
.alert {
  color: rgb(207, 6, 19);
}
</style>
