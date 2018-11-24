<template>
  <div>
    <video
      ref="video"
      :width="windowWidth"
      :height="windowHeight"
      playsinline
      autoplay
    ></video>
    <!-- <canvas ref="canvas" :width="windowWidth" :height="windowHeight"></canvas> -->
    <img ref="photo" src="">
    <button type="button" @click="takePicture">Take Picture</button>
    <button type="button" @click="openCamera">Open Camera</button>
    <!-- <select v-model="selectedCameraOption">
      <option :value="option" v-for="option in cameraOptions">{{ option.name }}</option>
    </select> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        video: null,
        photo: null,
        cameraOptions: [],
        selectedCameraOption: null,
        // context: null,
        // canvas: null,
      }
    },
    computed: {
      windowWidth() {
        return window.innerWidth
      },
      windowHeight() {
        return window.innerHeight
      },
    },
    methods: {
      async openCamera() {
        if (window.stream) {
          window.stream.getTracks().forEach(track => track.stop())
        }

        const videoSource = this.selectedCameraOption.deviceId

        window.stream = await navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              deviceId: videoSource ? { exact: videoSource } : undefined,
            },
          })

        console.log(window.stream)

        this.$refs.video.srcObject = window.stream
      },
      takePicture() {
        // this.context.drawImage(this.video, 0, 0, 400, 300)
        // this.$refs.photo.setAttribute('src', this.canvas.toDataUrl('image/png'))
      },
      async init() {
        const cameraOptions = await navigator.mediaDevices.enumerateDevices()

        this.cameraOptions = cameraOptions.filter(option => option.kind === 'videoinput')
        this.selectedCameraOption = this.cameraOptions[0] // this.cameraOptions.length - 1

        console.log(this.cameraOptions)
        console.log(this.selectedCameraOption)
      },
    },
    mounted() {
      this.init()

      // this.canvas = this.$refs.canvas
      // this.context = this.$refs.canvas.getContext('2d')
    },
  }
</script>

<style scoped>
  video {
    outline: 1px solid red;
  }
</style>
